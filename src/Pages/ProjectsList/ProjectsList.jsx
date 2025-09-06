import React, { useState, useEffect } from 'react'
import { FaEye, FaEdit, FaTrash, FaGithub, FaExternalLinkAlt, FaStar, FaFilter, FaSearch, FaCode, FaLaptop, FaServer, FaVideo, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { projectsAPI } from '../../utils/api'
import useAuth from '../../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { deleteProject, showSuccess, showError, handleFeatureToggle } from '../../utils/sweetAlerts'
import ComponentLoading from '../../Shared/LoadingAnimation/ComponentLoading'

const ProjectsList = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  
  const { user } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.email === 'rijoanmaruf@gmail.com'

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, searchTerm, showFeaturedOnly])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await projectsAPI.getAll()
      if (response.success) {
        setProjects(response.data)
        setError(null)
      } else {
        setError('Failed to fetch projects')
        await showError(
          'Failed to Load Projects!',
          response.message || 'Unable to load projects from the server. Please try again.'
        )
      }
    } catch (err) {
      setError('Error fetching projects')
      console.error('Error:', err)
      await showError(
        'Connection Error!',
        'Unable to connect to the server. Please check your internet connection and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const filterProjects = () => {
    let filtered = [...projects]
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    
    // Featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter(project => project.isFeatured)
    }
    
    setFilteredProjects(filtered)
  }

  const handleViewDetails = (projectId) => {
    navigate(`/projects/${projectId}`)
  }

  const handleEdit = (projectId) => {
    navigate(`/dashboard/add-project?edit=${projectId}`)
  }

  const handleDelete = async (projectId) => {
    // Find the project to get its title
    const project = projects.find(p => p._id === projectId)
    const projectTitle = project?.title || 'this project'
    
    const result = await deleteProject(projectTitle)
    
    if (result.isConfirmed) {
      try {
        const response = await projectsAPI.delete(projectId)
        if (response.success) {
          setProjects(projects.filter(p => p._id !== projectId))
          // Also update filtered projects
          setFilteredProjects(filteredProjects.filter(p => p._id !== projectId))
          
          await showSuccess(
            'Project Deleted!', 
            `"${projectTitle}" has been successfully deleted from your portfolio.`
          )
        } else {
          await showError(
            'Delete Failed!',
            response.message || 'Failed to delete the project. Please try again.'
          )
        }
      } catch (err) {
        console.error('Error deleting project:', err)
        await showError(
          'Connection Error!',
          'Unable to delete the project. Please check your connection and try again.'
        )
      }
    }
  }

  const handleFeatureToggleClick = async (project) => {
    const updateCallback = (projectId, updatedData) => {
      // Update projects state
      setProjects(prevProjects =>
        prevProjects.map(p => p._id === projectId ? { ...p, ...updatedData } : p)
      )
      // Update filtered projects state
      setFilteredProjects(prevFiltered =>
        prevFiltered.map(p => p._id === projectId ? { ...p, ...updatedData } : p)
      )
    }
    
    await handleFeatureToggle(project, projectsAPI, updateCallback)
  }

  if (loading) {
    return <ComponentLoading message="Loading projects..." />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error}</div>
          <button
            onClick={fetchProjects}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-6 sm:py-8 lg:py-12 xl:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          className="text-center mb-6 sm:mb-8 lg:mb-12"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h1 className="text-2xl xs:text-3xl sm:text-4xl  font-bold text-white mb-3 sm:mb-4 px-2">
            Portfolio <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Projects</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Explore my collection of projects, built with modern technologies and best practices.
          </p>
        </div>

        {/* Filters and Controls */}
        <div
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="100"
        >
          <div className="flex flex-col space-y-3 sm:space-y-4 lg:space-y-0 lg:flex-row lg:gap-4 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:flex-1 lg:max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 sm:py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-all"
              />
            </div>

            {/* Featured Filter & View Mode Container */}
            <div className="flex gap-3">
              {/* Featured Filter */}
              <button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-2.5 rounded-lg transition-all text-sm font-medium whitespace-nowrap min-h-[44px] ${
                  showFeaturedOnly
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30'
                    : 'bg-slate-700/50 text-gray-400 border border-slate-600 hover:text-white hover:bg-slate-600/50'
                }`}
              >
                <FaStar className="text-xs sm:text-sm" />
                <span className="hidden xs:inline">Featured</span>
                <span className="xs:hidden">⭐</span>
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>

        {/* Projects Grid/List */}
        <div>
          {filteredProjects.length === 0 ? (
            <div
              className="text-center py-12 sm:py-16 lg:py-20"
            >
              <div className="text-gray-400 text-xl sm:text-2xl lg:text-3xl mb-4 font-semibold">No projects found</div>
              <p className="text-gray-500 text-base sm:text-lg px-4 max-w-md mx-auto">Try adjusting your search or filter criteria to find what you're looking for</p>
            </div>
          ) : (
            <div
              className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12'
              
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                  isAdmin={isAdmin}
                  onViewDetails={handleViewDetails}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onFeatureToggle={handleFeatureToggleClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ProjectCard = ({ project, index, isAdmin, onViewDetails, onEdit, onDelete, onFeatureToggle }) => {
  // Handle multiple images - use first image or fallback to single image
  const displayImages = project.images && project.images.length > 0 ? project.images : [project.image];
  const hasMultipleImages = displayImages.length > 1;
  
  // State for image carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Auto-slide effect for multiple images
  useEffect(() => {
    if (hasMultipleImages && !isPaused) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Change image every 4 seconds
      
      return () => clearInterval(interval);
    }
  }, [hasMultipleImages, displayImages.length, isPaused]);
  
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1
    );
  };
  
  const goToImage = (e, index) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <div
      className='group relative overflow-hidden rounded-3xl transition-all duration-500 ease-out cursor-pointer transform hover:scale-[1.03] hover:-translate-y-2 flex flex-col h-full max-w-md mx-auto'
      onClick={() => onViewDetails(project._id)}
      onMouseEnter={() => {
        setIsPaused(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsHovered(false);
      }}
    >
      {/* Card Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl" />
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-cyan-500/50 to-purple-500/0 p-px opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-full h-full rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      </div>
      
      {/* Floating Orbs Background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-1000" />
      </div>
      {/* Image Section with 3D Effect */}
      <div className='relative z-10 h-64 sm:h-72 overflow-hidden'>
        {/* Image Container with 3D Transform */}
        <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />
          
          {/* Multiple Images with Smooth Transitions */}
          {displayImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${
                index === currentImageIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-110'
              }`}
            >
              <img
                src={image}
                alt={`${project.title} - Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 z-30" />
        </div>
        
        {/* Floating Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-40">
          {project.isFeatured && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full shadow-lg backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
              <FaStar className="text-xs" />
              <span>Featured</span>
            </div>
          )}
          
          {hasMultipleImages && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/70 text-white text-xs font-medium rounded-full backdrop-blur-sm">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <span>{currentImageIndex + 1}/{displayImages.length}</span>
            </div>
          )}
        </div>
        
        {/* Admin Controls - Redesigned */}
        {isAdmin && (
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0 z-40">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFeatureToggle(project);
              }}
              className={`p-2.5 backdrop-blur-md text-white rounded-xl transition-all duration-200 hover:scale-110 shadow-xl ${
                project.isFeatured 
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-yellow-400/50' 
                  : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:shadow-gray-400/50'
              }`}
              title={project.isFeatured ? "Remove from Featured" : "Add to Featured"}
            >
              <FaStar className="text-sm" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(project._id);
              }}
              className="p-2.5 bg-gradient-to-r from-blue-500 to-blue-600 backdrop-blur-md text-white rounded-xl hover:scale-110 transition-all duration-200 shadow-xl hover:shadow-blue-400/50"
              title="Edit Project"
            >
              <FaEdit className="text-sm" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(project._id);
              }}
              className="p-2.5 bg-gradient-to-r from-red-500 to-red-600 backdrop-blur-md text-white rounded-xl hover:scale-110 transition-all duration-200 shadow-xl hover:shadow-red-400/50"
              title="Delete Project"
            >
              <FaTrash className="text-sm" />
            </button>
          </div>
        )}
        
        {/* Navigation Controls for Multiple Images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/80 hover:scale-110 transition-all duration-300 z-40"
              title="Previous Image"
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/80 hover:scale-110 transition-all duration-300 z-40"
              title="Next Image"
            >
              <FaChevronRight className="text-sm" />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => goToImage(e, index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentImageIndex === index 
                      ? 'bg-white scale-125 shadow-lg' 
                      : 'bg-white/60 hover:bg-white/90 hover:scale-110'
                  }`}
                  title={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Floating Action Buttons */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-40">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:scale-105 transition-all duration-200 text-sm font-semibold shadow-xl hover:shadow-emerald-400/50 backdrop-blur-sm"
            >
              <FaExternalLinkAlt className="text-sm" />
              <span className="hidden sm:inline">Live Demo</span>
              <span className="sm:hidden">Demo</span>
            </a>
          )}
          {project.liveVideoUrl && (
            <a
              href={project.liveVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:scale-105 transition-all duration-200 text-sm font-semibold shadow-xl hover:shadow-red-400/50 backdrop-blur-sm"
            >
              <FaVideo className="text-sm" />
              <span className="hidden sm:inline">Video</span>
              <span className="sm:hidden">Video</span>
            </a>
          )}
        </div>
      </div>

      {/* Content Section with Glass Morphism */}
      <div className="relative z-10 flex-1 p-6 sm:p-8">
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-b-3xl" />
        
        <div className="relative z-10">
          {/* Title with Gradient */}
          <h3 className="text-xl sm:text-2xl font-bold mb-3 text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text leading-tight group-hover:from-blue-200 group-hover:via-white group-hover:to-cyan-200 transition-all duration-500">
            {project.title}
          </h3>

          {/* Description with Better Typography */}
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
            {project.description}
          </p>

          {/* Technology Tags with 3D Effect */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 6).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-200 border border-blue-400/30 rounded-full text-xs font-medium backdrop-blur-sm hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-300/50 hover:scale-105 hover:text-blue-100 transition-all duration-200 cursor-default shadow-lg"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 6 && (
              <span className="px-3 py-1.5 bg-slate-600/30 text-gray-300 border border-slate-500/40 rounded-full text-xs font-medium backdrop-blur-sm hover:bg-slate-500/40 hover:text-gray-200 transition-all duration-200 cursor-default">
                +{project.tags.length - 6}
              </span>
            )}
          </div>

          {/* Bottom Section with Enhanced Design */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {/* Source Code Links with Better Icons */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 font-medium">Source:</span>
              <div className="flex gap-2">
                {project.clientSourceCode && (
                  <a
                    href={project.clientSourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2.5 bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 rounded-xl hover:from-blue-500/30 hover:to-blue-600/30 hover:text-blue-200 hover:scale-110 transition-all duration-200 backdrop-blur-sm border border-blue-400/20"
                    title="Frontend Code"
                  >
                    <FaLaptop className="text-sm" />
                  </a>
                )}
                {project.serverSourceCode && (
                  <a
                    href={project.serverSourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2.5 bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 rounded-xl hover:from-purple-500/30 hover:to-purple-600/30 hover:text-purple-200 hover:scale-110 transition-all duration-200 backdrop-blur-sm border border-purple-400/20"
                    title="Backend Code"
                  >
                    <FaServer className="text-sm" />
                  </a>
                )}
                {(!project.clientSourceCode && !project.serverSourceCode) && (
                  <span className="text-xs text-gray-500 flex items-center px-3 py-2 bg-gray-600/20 rounded-xl backdrop-blur-sm">
                    <FaGithub className="mr-2 text-sm" />
                    Private Repository
                  </span>
                )}
              </div>
            </div>

            {/* Enhanced View Details Button */}
            <button
              onClick={() => onViewDetails(project._id)}
              className="group/btn flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-500 hover:to-cyan-500 hover:scale-105 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-blue-500/50 backdrop-blur-sm"
            >
              <span>Explore</span>
              <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Shadow and Glow Effects */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
        {/* Multiple layered glows */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 blur-xl transform scale-110" />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/5 to-cyan-600/5 blur-2xl transform scale-125" />
      </div>

      {/* Drop Shadow */}
      <div className="absolute inset-0 rounded-3xl shadow-2xl shadow-black/50 group-hover:shadow-blue-500/20 transition-all duration-500 transform translate-y-4 group-hover:translate-y-8 opacity-50 group-hover:opacity-100 scale-95 group-hover:scale-100" />
    </div>
  )
}

export default ProjectsList