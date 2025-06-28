import Swal from 'sweetalert2'

// Common SweetAlert2 configuration
const defaultConfig = {
  background: '#1e293b',
  color: '#ffffff',
  customClass: {
    popup: 'border border-slate-600'
  }
}

// Confirmation alert for delete actions
export const confirmDelete = async (title = 'Delete Item?', text = 'This action cannot be undone!') => {
  return await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    ...defaultConfig
  })
}

// Success alert
export const showSuccess = async (title = 'Success!', text = 'Operation completed successfully!') => {
  return await Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonColor: '#10b981',
    confirmButtonText: 'Great!',
    ...defaultConfig
  })
}

// Error alert
export const showError = async (title = 'Error!', text = 'Something went wrong. Please try again.') => {
  return await Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonColor: '#ef4444',
    confirmButtonText: 'Try Again',
    ...defaultConfig
  })
}

// Loading alert
export const showLoading = (title = 'Processing...', text = 'Please wait while we process your request') => {
  Swal.fire({
    title,
    text,
    icon: 'info',
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    ...defaultConfig,
    didOpen: () => {
      Swal.showLoading()
    }
  })
}

// Confirmation alert for general actions
export const confirmAction = async (title = 'Are you sure?', text = 'Do you want to proceed with this action?', confirmText = 'Yes, proceed!') => {
  return await Swal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3b82f6',
    cancelButtonColor: '#64748b',
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancel',
    ...defaultConfig
  })
}

// Toast notification
export const showToast = (title, icon = 'success') => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    ...defaultConfig,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon,
    title
  })
}

// Delete project specific function
export const deleteProject = async (projectTitle) => {
  const result = await confirmDelete(
    'Delete Project?',
    `Are you sure you want to delete "${projectTitle}"? This action cannot be undone!`
  )
  
  if (result.isConfirmed) {
    showLoading('Deleting Project...', 'Please wait while we delete the project')
  }
  
  return result
}

// Feature/Unfeature project confirmation
export const confirmFeatureToggle = async (isFeatured, projectTitle) => {
  const action = isFeatured ? 'unfeature' : 'feature'
  const actionText = isFeatured ? 'remove this project from featured' : 'feature this project'
  
  return await confirmAction(
    `${action.charAt(0).toUpperCase() + action.slice(1)} Project?`,
    `Are you sure you want to ${actionText}: "${projectTitle}"?`,
    `Yes, ${action} it!`
  )
}

// Handle feature toggle with API call
export const handleFeatureToggle = async (project, projectsAPI, updateCallback) => {
  const result = await confirmFeatureToggle(project.isFeatured, project.title)
  
  if (result.isConfirmed) {
    showLoading(
      project.isFeatured ? 'Unfeaturing Project...' : 'Featuring Project...',
      'Please wait while we update the project'
    )
    
    try {
      const updatedData = { ...project, isFeatured: !project.isFeatured }
      const response = await projectsAPI.update(project._id, updatedData)
      
      if (response.success) {
        await showSuccess(
          'Success!',
          `Project "${project.title}" has been ${project.isFeatured ? 'unfeatured' : 'featured'} successfully!`
        )
        
        // Call the callback to update the UI
        if (updateCallback) {
          updateCallback(project._id, updatedData)
        }
      } else {
        await showError(
          'Update Failed!',
          response.message || 'Failed to update the project. Please try again.'
        )
      }
    } catch (error) {
      console.error('Error updating project:', error)
      await showError(
        'Connection Error!',
        'Unable to update the project. Please check your connection and try again.'
      )
    }
  }
}
