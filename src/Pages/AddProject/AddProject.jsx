import React, { useState, useEffect } from 'react'
import { FaPlus, FaEdit } from 'react-icons/fa'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { projectsAPI } from '../../utils/api'
import useAuth from '../../Hooks/useAuth'
import Swal from 'sweetalert2'
import { 
  FormHeader,
  ProjectDetailsSection, 
  ProjectLinksSection, 
  ProjectTagsSection, 
  SubmitStatus 
} from './components'

const AddProject = () => {
  console.log("AddProject component rendering")
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const editId = searchParams.get('edit')
  const isEditMode = Boolean(editId)
  
  // Check if user is admin - removing potential null reference
  const isAdmin = user?.email === 'rijoanmaruf@gmail.com'
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '', // Keep for backward compatibility
    images: [], // New field for multiple images
    clientSourceCode: '',
    serverSourceCode: '',
    liveLink: '',
    liveVideoUrl: '',
    isFeatured: false,
    tags: []
  });

  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  // New states for image upload
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]); // For multiple images

  // Redirect non-admin users
  useEffect(() => {
    if (!isAdmin) {
      navigate('/projects')
      return
    }
  }, [isAdmin, navigate])

  // Load project data for editing
  useEffect(() => {
    const loadProjectForEdit = async () => {
      if (isEditMode && editId && isAdmin) {
        try {
          setIsLoading(true)
          const response = await projectsAPI.getById(editId)
          
          if (response.success) {
            const project = response.data
            setFormData({
              title: project.title || '',
              description: project.description || '',
              image: project.image || '',
              images: project.images || [], // Load multiple images
              clientSourceCode: project.clientSourceCode || '',
              serverSourceCode: project.serverSourceCode || '',
              liveLink: project.liveLink || '',
              liveVideoUrl: project.liveVideoUrl || '',
              isFeatured: project.isFeatured || false,
              tags: project.tags || []
            })
            
            // Handle image previews - prioritize multiple images over single image
            if (project.images && project.images.length > 0) {
              // Use multiple images
              setImagePreviews(project.images);
              setImagePreview(null); // Clear single image preview
            } else if (project.image) {
              // Fallback to single image for backward compatibility
              setImagePreview(project.image);
              setImagePreviews([]); // Clear multiple image previews
            } else {
              // No images
              setImagePreview(null);
              setImagePreviews([]);
            }
          } else {
            setSubmitStatus('error')
            console.error('Failed to load project:', response.message)
            
            // Show error alert for loading failure
            await Swal.fire({
              title: 'Error Loading Project!',
              text: response.message || 'Failed to load project data. Please try again.',
              icon: 'error',
              confirmButtonColor: '#ef4444',
              confirmButtonText: 'Go Back',
              background: '#1e293b',
              color: '#ffffff',
              customClass: {
                popup: 'border border-slate-600'
              }
            });
            
            navigate('/projects');
          }
        } catch (error) {
          console.error('Error loading project:', error)
          setSubmitStatus('error')
          
          // Show error alert for network/unexpected errors
          await Swal.fire({
            title: 'Connection Error!',
            text: 'Unable to load project data. Please check your connection and try again.',
            icon: 'error',
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Go Back',
            background: '#1e293b',
            color: '#ffffff',
            customClass: {
              popup: 'border border-slate-600'
            }
          });
          
          navigate('/projects');
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadProjectForEdit()
  }, [isEditMode, editId, isAdmin, navigate])

  // Don't render if not admin
  if (!isAdmin) {
    return null
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle image upload with ImgBB (supports multiple files)
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (!files.length) return;
    
    // Validate all files
    for (let file of files) {
      // Only allow image files
      if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
        Swal.fire({
          title: 'Invalid File Type',
          text: `Please select valid image files (JPEG, PNG, GIF, or WEBP). Found invalid file: ${file.name}`,
          icon: 'error',
          confirmButtonColor: '#ef4444',
          background: '#1e293b',
          color: '#ffffff',
          customClass: {
            popup: 'border border-slate-600'
          }
        });
        return;
      }
      
      // File size validation (max 2MB per file)
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          title: 'File Too Large',
          text: `Please select images less than 2MB each. File "${file.name}" is too large.`,
          icon: 'error',
          confirmButtonColor: '#ef4444',
          background: '#1e293b',
          color: '#ffffff',
          customClass: {
            popup: 'border border-slate-600'
          }
        });
        return;
      }
    }
    
    // Check total number of images (limit to 5)
    if (files.length + imagePreviews.length > 5) {
      Swal.fire({
        title: 'Too Many Images',
        text: 'You can upload a maximum of 5 images per project.',
        icon: 'warning',
        confirmButtonColor: '#f59e0b',
        background: '#1e293b',
        color: '#ffffff',
        customClass: {
          popup: 'border border-slate-600'
        }
      });
      return;
    }
    
    // Show local previews before upload
    const newPreviews = [];
    for (let file of files) {
      const reader = new FileReader();
      const previewPromise = new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
      newPreviews.push(await previewPromise);
    }
    
    setImagePreviews(prev => [...prev, ...newPreviews]);
    setIsUploading(true);
    
    try {
      // Get API key from environment variables
      const apiKey = import.meta.env.VITE_IMGBB_API;
      
      if (!apiKey) {
        throw new Error('ImgBB API key not found');
      }
      
      // Upload all files
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
          return result.data.url;
        } else {
          throw new Error(result.error?.message || 'Failed to upload image');
        }
      });
      
      const uploadedUrls = await Promise.all(uploadPromises);
      
      // Update form data with the uploaded image URLs
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
        // Set first image as main image for backward compatibility
        image: prev.image || uploadedUrls[0]
      }));
      
      Swal.fire({
        title: 'Images Uploaded',
        text: `${uploadedUrls.length} image(s) have been uploaded successfully!`,
        icon: 'success',
        confirmButtonColor: '#10b981',
        timer: 2000,
        timerProgressBar: true,
        background: '#1e293b',
        color: '#ffffff',
        customClass: {
          popup: 'border border-slate-600'
        }
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      
      Swal.fire({
        title: 'Upload Failed',
        text: error.message || 'Failed to upload images. Please try again.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: '#1e293b',
        color: '#ffffff',
        customClass: {
          popup: 'border border-slate-600'
        }
      });
      
      // Reset previews on error
      setImagePreviews(prev => prev.slice(0, -files.length));
    } finally {
      setIsUploading(false);
    }
  };

  // Remove image from the gallery
  const removeImage = (indexToRemove) => {
    const updatedImages = formData.images.filter((_, index) => index !== indexToRemove);
    const updatedPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);
    
    setFormData(prev => ({
      ...prev,
      images: updatedImages,
      // Update main image field - use first image or empty string
      image: updatedImages.length > 0 ? updatedImages[0] : ''
    }));
    setImagePreviews(updatedPreviews);
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Show confirmation dialog before submitting
    const result = await Swal.fire({
      title: isEditMode ? 'Update Project?' : 'Add New Project?',
      text: isEditMode 
        ? 'Are you sure you want to update this project?' 
        : 'Are you sure you want to add this project to your portfolio?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: isEditMode ? 'Yes, update it!' : 'Yes, add it!',
      cancelButtonText: 'Cancel',
      background: '#1e293b',
      color: '#ffffff',
      customClass: {
        popup: 'border border-slate-600'
      }
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Show loading alert
    Swal.fire({
      title: isEditMode ? 'Updating Project...' : 'Adding Project...',
      text: 'Please wait while we process your request',
      icon: 'info',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      background: '#1e293b',
      color: '#ffffff',
      customClass: {
        popup: 'border border-slate-600'
      },
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      let apiResult;
      
      if (isEditMode) {
        // Update existing project
        apiResult = await projectsAPI.update(editId, formData);
      } else {
        // Create new project
        apiResult = await projectsAPI.create(formData);
      }
      
      if (apiResult.success) {
        setSubmitStatus('success');
        
        // Show success alert
        await Swal.fire({
          title: 'Success!',
          text: isEditMode 
            ? 'Project has been updated successfully!' 
            : 'Project has been added to your portfolio successfully!',
          icon: 'success',
          confirmButtonColor: '#10b981',
          confirmButtonText: 'Great!',
          background: '#1e293b',
          color: '#ffffff',
          customClass: {
            popup: 'border border-slate-600'
          }
        });
        
        // Reset form if creating new project
        if (!isEditMode) {
          setFormData({
            title: '',
            description: '',
            image: '',
            images: [],
            clientSourceCode: '',
            serverSourceCode: '',
            liveLink: '',
            liveVideoUrl: '',
            isFeatured: false,
            tags: []
          });
          setImagePreview(null);
          setImagePreviews([]);
        }
        
        // Redirect to projects list
        navigate('/projects');
      } else {
        setSubmitStatus('error');
        
        // Show error alert
        await Swal.fire({
          title: 'Error!',
          text: apiResult.message || 'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonColor: '#ef4444',
          confirmButtonText: 'Try Again',
          background: '#1e293b',
          color: '#ffffff',
          customClass: {
            popup: 'border border-slate-600'
          }
        });
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      setSubmitStatus('error');
      
      // Show error alert
      await Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Try Again',
        background: '#1e293b',
        color: '#ffffff',
        customClass: {
          popup: 'border border-slate-600'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-au ">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {isEditMode ? (
              <>
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Edit</span> Project
              </>
            ) : (
              <>
                Add New <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Project</span>
              </>
            )}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {isEditMode 
              ? 'Update your project details and showcase your latest work'
              : 'Showcase your amazing work and add it to your portfolio collection'
            }
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-4 text-blue-400">
              <div className="relative">
                <div className="w-8 h-8 border-2 border-transparent border-t-blue-500 border-r-cyan-400 rounded-full animate-spin"></div>
                <div className="absolute inset-1 w-6 h-6 border-2 border-transparent border-b-purple-500 border-l-pink-400 rounded-full animate-spin-reverse"></div>
              </div>
              <span className="text-lg font-medium">
                Loading project data
                <span className="inline-block animate-bounce ml-1">.</span>
                <span className="inline-block animate-bounce ml-1" style={{ animationDelay: '0.2s' }}>.</span>
                <span className="inline-block animate-bounce ml-1" style={{ animationDelay: '0.4s' }}>.</span>
              </span>
            </div>
          </div>
        )}

        {/* Submit Status */}
        <div>
          <SubmitStatus 
            submitStatus={submitStatus} 
            isEditMode={isEditMode}
          />
        </div>

        {/* Form */}
        {!isLoading && (
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 lg:space-y-10 mx-4 sm:mx-0"
            >
              {/* Responsive Grid Layout */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                
                {/* Left Column - Project Details */}
                <div className="space-y-6 sm:space-y-8">
                  <ProjectDetailsSection 
                    formData={formData} 
                    handleInputChange={handleInputChange}
                    handleImageUpload={handleImageUpload}
                    isUploading={isUploading}
                    imagePreview={imagePreview}
                    imagePreviews={imagePreviews}
                    removeImage={removeImage}
                  />
                </div>

                {/* Right Column - Links and Tags */}
                <div className="space-y-6 sm:space-y-8">
                  <ProjectLinksSection 
                    formData={formData} 
                    handleInputChange={handleInputChange} 
                  />
                  
                  <ProjectTagsSection 
                    formData={formData}
                    currentTag={currentTag}
                    setCurrentTag={setCurrentTag}
                    addTag={addTag}
                    removeTag={removeTag}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6 sm:pt-8 border-t border-slate-600">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
                >
                  {isEditMode ? <FaEdit className="text-lg sm:text-xl" /> : <FaPlus className="text-lg sm:text-xl" />}
                  <span className="text-sm sm:text-base lg:text-lg">
                    {isSubmitting 
                      ? (isEditMode ? 'Updating Project...' : 'Adding Project...') 
                      : (isEditMode ? 'Update Project' : 'Add Project to Portfolio')
                    }
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddProject