import React, { useState, useEffect } from 'react'
import { 
  FaUser, 
  FaCogs,
  FaChartBar,
  FaProjectDiagram,
  FaDownload,
  FaEdit,
  FaSave,
  FaTimes
} from 'react-icons/fa'
import useAuth from '../../Hooks/useAuth'
import { resumeAPI } from '../../utils/api'
import { showSuccess, showError } from '../../utils/sweetAlerts'

const Admin = () => {
  const { user } = useAuth()
  const [resumeLink, setResumeLink] = useState('')
  const [originalResumeLink, setOriginalResumeLink] = useState('')
  const [isEditingResume, setIsEditingResume] = useState(false)
  const [resumeLoading, setResumeLoading] = useState(false)

  // Check if user is admin
  const isAdmin = user?.email === 'rijoanmaruf@gmail.com'

  // Fetch resume link
  useEffect(() => {
    if (isAdmin) {
      fetchResumeLink()
    }
  }, [isAdmin])

  const fetchResumeLink = async () => {
    try {
      const response = await resumeAPI.get()
      if (response.success) {
        const link = response.data.link || ''
        setResumeLink(link)
        setOriginalResumeLink(link)
      }
    } catch (error) {
      console.error('Error fetching resume link:', error)
    }
  }

  const handleResumeEdit = () => {
    setIsEditingResume(true)
  }

  const handleResumeSave = async () => {
    if (resumeLink.trim() === '') {
      showError('Validation Error', 'Resume link cannot be empty')
      return
    }

    try {
      setResumeLoading(true)
      await resumeAPI.update(resumeLink, user?.email)
      setOriginalResumeLink(resumeLink)
      setIsEditingResume(false)
      showSuccess('Success!', 'Resume link updated successfully')
    } catch (error) {
      console.error('Error updating resume link:', error)
      showError('Update Failed', 'Failed to update resume link')
    } finally {
      setResumeLoading(false)
    }
  }

  const handleResumeCancel = () => {
    setResumeLink(originalResumeLink)
    setIsEditingResume(false)
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#000000,#111111,#0a0a0a)] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-3">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
            Admin <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Dashboard</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm">Manage your portfolio</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Projects Management */}
          <div className="bg-gradient-to-br from-slate-800/70 to-blue-900/30 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-lg transition-all duration-300 hover:shadow-blue-900/30 hover:border-blue-500/60">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                <FaProjectDiagram className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Projects</h3>
                <p className="text-gray-400 text-sm">Manage your projects</p>
              </div>
            </div>
            <div className="space-y-2">
              <a
                href="/dashboard/add-project"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center text-sm"
              >
                Add New Project
              </a>
              <a
                href="/projects"
                className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center text-sm"
              >
                View All Projects
              </a>
            </div>
          </div>

          {/* Portfolio Stats */}
          <div className="bg-gradient-to-br from-slate-800/70 to-green-900/30 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-lg transition-all duration-300 hover:shadow-green-900/30 hover:border-green-500/60">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center">
                <FaChartBar className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Analytics</h3>
                <p className="text-gray-400 text-sm">Portfolio insights</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">Portfolio</div>
              <div className="text-gray-400 text-sm">Performance metrics</div>
            </div>
          </div>
        </div>

        {/* Resume Management Section */}
        <div className="mb-6">
          <div className="bg-gradient-to-br from-slate-800/70 to-purple-900/30 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-lg transition-all duration-300 hover:shadow-purple-900/30 hover:border-purple-500/60">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-pink-400 rounded-full flex items-center justify-center">
                <FaDownload className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Resume Link</h3>
                <p className="text-gray-400 text-sm">Manage your CV/Resume download link</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Current Resume Link Display */}
              {!isEditingResume ? (
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="text-sm text-gray-400 mb-1">Current Resume Link:</div>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-sm">
                      {originalResumeLink ? (
                        <a 
                          href={originalResumeLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 break-all"
                        >
                          {originalResumeLink}
                        </a>
                      ) : (
                        <span className="text-gray-500 italic">No resume link set</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleResumeEdit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
                  >
                    <FaEdit className="text-xs" />
                    Edit
                  </button>
                </div>
              ) : (
                /* Resume Link Edit Form */
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Resume/CV Download Link:
                    </label>
                    <input
                      type="url"
                      value={resumeLink}
                      onChange={(e) => setResumeLink(e.target.value)}
                      placeholder="https://example.com/your-resume.pdf"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
                    />
                    <div className="text-xs text-gray-400 mt-1">
                      Enter a direct link to your resume/CV (PDF, Google Drive, Dropbox, etc.)
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleResumeSave}
                      disabled={resumeLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <FaSave className="text-xs" />
                      {resumeLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleResumeCancel}
                      disabled={resumeLoading}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <FaTimes className="text-xs" />
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {/* Settings */}
          <div className="bg-gradient-to-br from-slate-800/70 to-indigo-900/30 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-lg transition-all duration-300 hover:shadow-indigo-900/30 hover:border-indigo-500/60">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-400 rounded-full flex items-center justify-center">
                <FaCogs className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Settings</h3>
                <p className="text-gray-400 text-sm">Configure portfolio</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg text-white mb-2">Welcome back!</div>
              <div className="text-gray-400 text-sm flex items-center justify-center gap-2">
                <FaUser className="text-xs" />
                {user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
