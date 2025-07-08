import React, { useState, useEffect } from 'react'
import { FaEye, FaEdit, FaTrash, FaGithub, FaExternalLinkAlt, FaStar, FaFilter, FaSearch, FaCode, FaLaptop, FaServer } from 'react-icons/fa'
import { MdGridView, MdViewList } from 'react-icons/md'
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
  const [filterTag, setFilterTag] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  
  const { user } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.email === 'rijoanmaruf@gmail.com'

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, searchTerm, filterTag, showFeaturedOnly])

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
    
    // Tag filter
    if (filterTag) {
      filtered = filtered.filter(project =>
        project.tags.includes(filterTag)
      )
    }
    
    // Featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter(project => project.isFeatured)
    }
    
    setFilteredProjects(filtered)
  }

  const getAllTags = () => {
    const allTags = projects.flatMap(project => project.tags)
    return [...new Set(allTags)].sort()
  }

  const handleViewDetails = (projectId) => {
    navigate(`/projects/${projectId}`)
  }

  const handleEdit = (projectId) => {
    navigate(`/add-project?edit=${projectId}`)
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-6 sm:py-8 lg:py-12 xl:py-16">
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

            {/* Filters Row */}
            <div className="flex flex-col xs:flex-row gap-3 lg:items-center">
              {/* Tag Filter */}
              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="flex-1 xs:flex-none xs:min-w-[120px] px-3 sm:px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-all"
              >
                <option value="">All Tags</option>
                {getAllTags().map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>

              {/* Featured Filter & View Mode Container */}
              <div className="flex gap-2 xs:gap-3">
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

                {/* View Mode Toggle */}
                <div className="flex bg-slate-700/50 rounded-lg border border-slate-600">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 xs:p-3 rounded-l-lg transition-all min-h-[44px] min-w-[44px] ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-slate-600/50'
                    }`}
                    title="Grid View"
                  >
                    <MdGridView className="text-sm sm:text-base" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 xs:p-3 rounded-r-lg transition-all min-h-[44px] min-w-[44px] ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-slate-600/50'
                    }`}
                    title="List View"
                  >
                    <MdViewList className="text-sm sm:text-base" />
                  </button>
                </div>
              </div>
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
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <div className="text-gray-400 text-xl sm:text-2xl lg:text-3xl mb-4 font-semibold">No projects found</div>
              <p className="text-gray-500 text-base sm:text-lg px-4 max-w-md mx-auto">Try adjusting your search or filter criteria to find what you're looking for</p>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
                  : 'space-y-6'
              }
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                  viewMode={viewMode}
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

const ProjectCard = ({ project, index, viewMode, isAdmin, onViewDetails, onEdit, onDelete, onFeatureToggle }) => {
  return (
    <div
      className={`relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group ${
        viewMode === 'list' ? 'flex flex-col lg:flex-row h-auto lg:h-80' : 'flex flex-col h-full'
      }`}
      data-aos="fade-up"
      data-aos-duration="600"
      data-aos-delay={index * 100}
    >
      {/* Project Image */}
      <div className={`relative ${
        viewMode === 'list' 
          ? 'h-48 sm:h-56 lg:h-full lg:w-80 flex-shrink-0' 
          : 'h-48 sm:h-52 lg:h-56'
      } overflow-hidden`}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Featured Badge */}
        {project.isFeatured && (
          <div
            className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg"
            data-aos="zoom-in"
            data-aos-duration="400"
            data-aos-delay="300"
          >
            <FaStar className="text-xs" />
            Featured
          </div>
        )}

        {/* Admin Controls Overlay */}
        {isAdmin && (
          <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFeatureToggle(project);
              }}
              className={`p-2.5 backdrop-blur-sm text-white rounded-xl transition-all duration-200 shadow-lg ${
                project.isFeatured 
                  ? 'bg-yellow-600/90 hover:bg-yellow-500 hover:shadow-yellow-500/25' 
                  : 'bg-gray-600/90 hover:bg-gray-500 hover:shadow-gray-500/25'
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
              className="p-2.5 bg-blue-600/90 backdrop-blur-sm text-white rounded-xl hover:bg-blue-500 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              title="Edit Project"
            >
              <FaEdit className="text-sm" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(project._id);
              }}
              className="p-2.5 bg-red-600/90 backdrop-blur-sm text-white rounded-xl hover:bg-red-500 transition-all duration-200 shadow-lg hover:shadow-red-500/25"
              title="Delete Project"
            >
              <FaTrash className="text-sm" />
            </button>
          </div>
        )}

        {/* Quick Action Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-emerald-600/90 backdrop-blur-sm text-white rounded-xl hover:bg-emerald-500 transition-all duration-200 text-sm font-medium shadow-lg"
            >
              <FaExternalLinkAlt className="text-xs" />
              Live Demo
            </a>
          )}
          <button
            onClick={() => onViewDetails(project._id)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600/90 backdrop-blur-sm text-white rounded-xl hover:bg-blue-500 transition-all duration-200 text-sm font-medium shadow-lg"
          >
            <FaEye className="text-xs" />
            View Details
          </button>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, viewMode === 'list' ? 5 : 4).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-medium hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-200"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > (viewMode === 'list' ? 5 : 4) && (
            <span className="px-3 py-1 bg-slate-700/50 text-gray-400 border border-slate-600 rounded-full text-xs">
              +{project.tags.length - (viewMode === 'list' ? 5 : 4)} more
            </span>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          {/* Source Code Links */}
          <div className="flex gap-2">
            {project.clientSourceCode && (
              <a
                href={project.clientSourceCode}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2.5 bg-slate-700/50 text-gray-300 rounded-lg hover:bg-slate-600 hover:text-white transition-all duration-200"
                title="Client Code"
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
                className="p-2.5 bg-slate-700/50 text-gray-300 rounded-lg hover:bg-slate-600 hover:text-white transition-all duration-200"
                title="Server Code"
              >
                <FaServer className="text-sm" />
              </a>
            )}
          </div>

          {/* View More Button */}
          <button
            onClick={() => onViewDetails(project._id)}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
          >
            Learn More
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
      </div>
    </div>
  )
}

export default ProjectsList