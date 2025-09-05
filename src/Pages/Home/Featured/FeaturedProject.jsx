import React, { useState, useEffect } from 'react'
import { FaEye, FaExternalLinkAlt, FaStar, FaLaptop, FaServer, FaGithub, FaVideo } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { projectsAPI } from '../../../utils/api'
import Loading from '../../../Shared/LoadingAnimation/Loading'
import ComponentLoading from '../../../Shared/LoadingAnimation/ComponentLoading'

const FeaturedProject = () => {
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchFeaturedProjects()
  }, [])

  const fetchFeaturedProjects = async () => {
    try {
      setLoading(true)
      const response = await projectsAPI.getFeatured()
      if (response.success) {
        setFeaturedProjects(response.data)
        setError(null)
      } else {
        setError('Failed to fetch featured projects')
      }
    } catch (err) {
      setError(`Error fetching featured projects: ${err.message}`)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (projectId) => {
    navigate(`/projects/${projectId}`)
  }

  const handleViewAllProjects = () => {
    navigate('/projects')
  }

  if (loading) {
    return <ComponentLoading></ComponentLoading>
  }

  if (error) {
    return (
      <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-red-400 text-lg mb-4">{error}</div>
            <div className="text-gray-400 text-sm mb-4">
              Check console for more details. Loading: {loading.toString()}, Projects: {featuredProjects.length}
            </div>
            <button
              onClick={fetchFeaturedProjects}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (featuredProjects.length === 0) {
    return null // Don't show the section if no featured projects
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaStar className="text-yellow-400 text-xl" />
            <span className="text-yellow-400 font-semibold uppercase tracking-wide text-sm">Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Selected <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Explore my handpicked collection of projects that showcase innovation, creativity, and technical excellence
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 lg:mb-16">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project._id}
              project={project}
              index={index}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* View All Projects Button */}
        <div
          className="text-center"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="300"
        >
          <button
            onClick={handleViewAllProjects}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Projects
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  )
}

const FeaturedProjectCard = ({ project, index, onViewDetails }) => {
  return (
    <div
      className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
      data-aos="fade-up"
      data-aos-duration="600"
      data-aos-delay={index * 100}
    >
      {/* Project Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Featured Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
          <FaStar className="text-xs" />
          Featured
        </div>

        {/* Quick Actions Overlay */}
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
          {project.liveVideoUrl && (
            <a
              href={project.liveVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-red-600/90 backdrop-blur-sm text-white rounded-xl hover:bg-red-500 transition-all duration-200 text-sm font-medium shadow-lg"
            >
              <FaVideo className="text-xs" />
              Video
            </a>
          )}
          <button
            onClick={() => onViewDetails(project._id)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600/90 backdrop-blur-sm text-white rounded-xl hover:bg-blue-500 transition-all duration-200 text-sm font-medium shadow-lg"
          >
            <FaEye className="text-xs" />
            Details
          </button>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 bg-slate-700/50 text-gray-400 border border-slate-600 rounded-full text-xs">
              +{project.tags.length - 3} more
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

          {/* Learn More Button */}
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

export default FeaturedProject