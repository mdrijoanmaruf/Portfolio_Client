import React, { useState, useEffect } from 'react'
import { FaCode, FaLaptopCode, FaDatabase, FaBook, FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'
import { MdComputer } from 'react-icons/md'
import { courseworkAPI } from '../../../utils/api'
import useAuth from '../../../Hooks/useAuth'
import { showSuccess, showError, confirmAction } from '../../../utils/sweetAlerts'

const CourseworkSection = () => {
  const [coursework, setCoursework] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newStatus, setNewStatus] = useState('Ongoing')
  const [editTitle, setEditTitle] = useState('')
  const [editStatus, setEditStatus] = useState('Ongoing')
  const { user } = useAuth()

  // Status options
  const statusOptions = ['Completed', 'Ongoing', 'Upcoming']

  // Check if user is admin
  const isAdmin = user?.email === 'rijoanmaruf@gmail.com'

  // Course icons mapping
  const courseIcons = [FaCode, FaLaptopCode, FaDatabase, FaBook, MdComputer]
  const getRandomIcon = () => courseIcons[Math.floor(Math.random() * courseIcons.length)]

  // Fetch coursework
  useEffect(() => {
    fetchCoursework()
  }, [])

  const fetchCoursework = async () => {
    try {
      setLoading(true)
      const response = await courseworkAPI.getAll()
      if (response.success) {
        setCoursework(response.data)
      }
    } catch (error) {
      console.error('Error fetching coursework:', error)
      showError('Failed to Load', 'Unable to load coursework')
    } finally {
      setLoading(false)
    }
  }

  // Add new coursework
  const handleAddCoursework = async () => {
    if (!newTitle.trim()) {
      showError('Invalid Input', 'Please enter a course title')
      return
    }

    try {
      const response = await courseworkAPI.create({
        title: newTitle.trim(),
        status: newStatus,
        userEmail: user?.email
      })

      if (response.success) {
        setCoursework([...coursework, response.data])
        setNewTitle('')
        setNewStatus('Ongoing')
        setShowAddForm(false)
        showSuccess('Success!', 'Course added successfully!')
      }
    } catch (error) {
      console.error('Error adding coursework:', error)
      showError('Add Failed', 'Failed to add course')
    }
  }

  // Update coursework
  const handleUpdateCoursework = async (id) => {
    if (!editTitle.trim()) {
      showError('Invalid Input', 'Please enter a course title')
      return
    }

    try {
      const response = await courseworkAPI.update(id, {
        title: editTitle.trim(),
        status: editStatus,
        userEmail: user?.email
      })

      if (response.success) {
        setCoursework(coursework.map(course => 
          course._id === id ? response.data : course
        ))
        setEditingId(null)
        setEditTitle('')
        setEditStatus('Ongoing')
        showSuccess('Success!', 'Course updated successfully!')
      }
    } catch (error) {
      console.error('Error updating coursework:', error)
      showError('Update Failed', 'Failed to update course')
    }
  }

  // Delete coursework
  const handleDeleteCoursework = async (id, title) => {
    const result = await confirmAction(
      'Delete Course',
      `Are you sure you want to delete "${title}"?`,
      'Yes, delete it!'
    )

    if (result.isConfirmed) {
      try {
        const response = await courseworkAPI.delete(id, user?.email)

        if (response.success) {
          setCoursework(coursework.filter(course => course._id !== id))
          showSuccess('Success!', 'Course deleted successfully!')
        }
      } catch (error) {
        console.error('Error deleting coursework:', error)
        showError('Delete Failed', 'Failed to delete course')
      }
    }
  }

  // Start editing
  const startEditing = (course) => {
    setEditingId(course._id)
    setEditTitle(course.title)
    setEditStatus(course.status || 'Ongoing')
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null)
    setEditTitle('')
    setEditStatus('Ongoing')
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Relevant <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Coursework</span>
          </h3>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            Relevant <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Coursework</span>
          </h3>
          {isAdmin && (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-110 active:scale-95 transition-all duration-300"
            >
              <FaPlus className="text-xs sm:text-sm" />
            </button>
          )}
        </div>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
          Key subjects that have shaped my technical foundation
        </p>
      </div>

      {/* Add Form */}
        {showAddForm && isAdmin && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 sm:p-6 mx-2 sm:mx-0">
            <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Add New Course</h4>
            <div className="space-y-3 sm:space-y-4">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter course title..."
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 sm:px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                onKeyPress={(e) => e.key === 'Enter' && handleAddCoursework()}
              />
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 sm:px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status} className="bg-slate-700">
                    {status}
                  </option>
                ))}
              </select>
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handleAddCoursework}
                  className="px-3 sm:px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  <FaSave className="text-xs sm:text-sm" />
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setNewTitle('')
                    setNewStatus('Ongoing')
                  }}
                  className="px-3 sm:px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  <FaTimes className="text-xs sm:text-sm" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}      {/* Coursework Grid */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 px-2 sm:px-0">
        {coursework.map((course, index) => {
            const IconComponent = getRandomIcon()
            const isEditing = editingId === course._id

            return (
              <div
                key={course._id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-blue-500/50 rounded-xl p-4 sm:p-6 transition-all duration-300 group hover:scale-105"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="text-white text-sm sm:text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full bg-slate-700/50 border border-slate-600 rounded px-2 py-1 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') handleUpdateCoursework(course._id)
                            if (e.key === 'Escape') cancelEditing()
                          }}
                          autoFocus
                        />
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="w-full bg-slate-700/50 border border-slate-600 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-blue-500"
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status} className="bg-slate-700">
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-semibold text-white text-sm sm:text-base leading-tight line-clamp-2">{course.title}</h4>
                        <div className="mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            course.status === 'Completed' 
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                              : course.status === 'Ongoing'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                          }`}>
                            {course.status || 'Ongoing'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Controls */}
                {isAdmin && (
                  <div className={`flex justify-end gap-2 ${isEditing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-200`}>
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => handleUpdateCoursework(course._id)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center text-white transition-colors"
                        >
                          <FaSave className="text-xs" />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-500 hover:bg-gray-600 rounded-lg flex items-center justify-center text-white transition-colors"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(course)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center text-white transition-colors"
                        >
                          <FaEdit className="text-xs" />
                        </button>
                        <button
                          onClick={() => handleDeleteCoursework(course._id, course.title)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center text-white transition-colors"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )
          })}
      </div>

      {/* Empty State */}
      {coursework.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <FaBook className="text-3xl sm:text-4xl text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 text-sm sm:text-base">No coursework added yet</p>
          {isAdmin && (
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 px-4 sm:px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm sm:text-base"
            >
              Add First Course
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default CourseworkSection
