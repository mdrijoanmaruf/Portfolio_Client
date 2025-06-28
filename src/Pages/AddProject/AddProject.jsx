import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit } from 'react-icons/fa'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { projectsAPI } from '../../utils/api'
import useAuth from '../../Hooks/useAuth'
import { 
  FormHeader,
  ProjectDetailsSection, 
  ProjectLinksSection, 
  ProjectTagsSection, 
  SubmitStatus 
} from './components'

const AddProject = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const editId = searchParams.get('edit')
  const isEditMode = Boolean(editId)
  
  // Check if user is admin
  const isAdmin = user?.email === 'rijoanmaruf@gmail.com'
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    clientSourceCode: '',
    serverSourceCode: '',
    liveLink: '',
    isFeatured: false,
    tags: []
  });

  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
              clientSourceCode: project.clientSourceCode || '',
              serverSourceCode: project.serverSourceCode || '',
              liveLink: project.liveLink || '',
              isFeatured: project.isFeatured || false,
              tags: project.tags || []
            })
          } else {
            setSubmitStatus('error')
            console.error('Failed to load project:', response.message)
          }
        } catch (error) {
          console.error('Error loading project:', error)
          setSubmitStatus('error')
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadProjectForEdit()
  }, [isEditMode, editId, isAdmin])

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
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      let result;
      
      if (isEditMode) {
        // Update existing project
        result = await projectsAPI.update(editId, formData);
      } else {
        // Create new project
        result = await projectsAPI.create(formData);
      }
      
      if (result.success) {
        setSubmitStatus('success');
        
        // Reset form if creating new project
        if (!isEditMode) {
          setFormData({
            title: '',
            description: '',
            image: '',
            clientSourceCode: '',
            serverSourceCode: '',
            liveLink: '',
            isFeatured: false,
            tags: []
          });
        }
        
        // Redirect to projects list after successful operation
        setTimeout(() => {
          navigate('/projects');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 sm:py-12 lg:py-16 xl:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
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
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-12"
          >
            <div className="flex items-center gap-3 text-blue-400">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
              />
              Loading project data...
            </div>
          </motion.div>
        )}

        {/* Submit Status */}
        <SubmitStatus 
          submitStatus={submitStatus} 
          isEditMode={isEditMode}
        />

        {/* Form */}
        {!isLoading && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            
            {/* Left Column - Project Details */}
            <div className="space-y-6 sm:space-y-8">
              <ProjectDetailsSection 
                formData={formData} 
                handleInputChange={handleInputChange} 
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
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isEditMode ? <FaEdit className="text-lg sm:text-xl" /> : <FaPlus className="text-lg sm:text-xl" />}
                <span className="text-sm sm:text-base lg:text-lg">
                  {isSubmitting 
                    ? (isEditMode ? 'Updating Project...' : 'Adding Project...') 
                    : (isEditMode ? 'Update Project' : 'Add Project to Portfolio')
                  }
                </span>
              </motion.button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  )
}

export default AddProject