import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaEnvelope, 
  FaUser, 
  FaClock, 
  FaTrash, 
  FaEye, 
  FaEyeSlash,
  FaInbox,
  FaEnvelopeOpen,
  FaSearch,
  FaFilter,
  FaReply
} from 'react-icons/fa'
import { contactsAPI } from '../../utils/api'
import useAuth from '../../Hooks/useAuth'
import { showSuccess, showError, confirmAction } from '../../utils/sweetAlerts'

const Admin = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, read, unread
  const [searchTerm, setSearchTerm] = useState('')
  const { user } = useAuth()

  // Check if user is admin
  const isAdmin = user?.email === 'rijoanmaruf@gmail.com'

  // Fetch contacts
  useEffect(() => {
    if (isAdmin) {
      fetchContacts()
    }
  }, [isAdmin])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await contactsAPI.getAll(user?.email)
      if (response.success) {
        setContacts(response.data)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
      showError('Failed to Load', 'Unable to load contact messages')
    } finally {
      setLoading(false)
    }
  }

  // Mark as read/unread
  const toggleReadStatus = async (contactId, currentStatus) => {
    try {
      if (!currentStatus) {
        await contactsAPI.markAsRead(contactId, user?.email)
        setContacts(contacts.map(contact => 
          contact._id === contactId ? { ...contact, isRead: true } : contact
        ))
        showSuccess('Success!', 'Message marked as read')
      }
    } catch (error) {
      console.error('Error updating contact:', error)
      showError('Update Failed', 'Failed to update message status')
    }
  }

  // Delete contact
  const handleDeleteContact = async (contactId, contactName) => {
    const result = await confirmAction(
      'Delete Message',
      `Are you sure you want to delete the message from "${contactName}"?`,
      'Yes, delete it!'
    )

    if (result.isConfirmed) {
      try {
        await contactsAPI.delete(contactId, user?.email)
        setContacts(contacts.filter(contact => contact._id !== contactId))
        showSuccess('Success!', 'Message deleted successfully')
      } catch (error) {
        console.error('Error deleting contact:', error)
        showError('Delete Failed', 'Failed to delete message')
      }
    }
  }

  // Reply to contact
  const handleReply = (contact) => {
    const subject = `Re: Message from ${contact.name}`
    const body = `Hi ${contact.name},

Thank you for reaching out to me. I received your message:

"${contact.message}"

Best regards,
Rijoan Maruf`

    const mailtoLink = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, '_blank')
    
    // Mark as read when replying
    if (!contact.isRead) {
      toggleReadStatus(contact._id, contact.isRead)
    }
  }

  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    const matchesFilter = filter === 'all' || 
      (filter === 'read' && contact.isRead) || 
      (filter === 'unread' && !contact.isRead)
    
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  // Get statistics
  const stats = {
    total: contacts.length,
    unread: contacts.filter(c => !c.isRead).length,
    read: contacts.filter(c => c.isRead).length
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading contact messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Admin <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Dashboard</span>
          </h1>
          <p className="text-gray-400 text-xl">Manage contact form submissions</p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <FaInbox className="text-3xl text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-gray-400">Total Messages</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <FaEnvelopeOpen className="text-3xl text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.read}</div>
            <div className="text-gray-400">Read Messages</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <FaEnvelope className="text-3xl text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.unread}</div>
            <div className="text-gray-400">Unread Messages</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            
            {/* Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Contact Messages */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-slate-800/50 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:border-blue-500/50 ${
                  contact.isRead ? 'border-slate-700' : 'border-blue-500/30 bg-blue-900/10'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      contact.isRead ? 'bg-gray-600' : 'bg-blue-500'
                    }`}>
                      <FaUser className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{contact.name}</h3>
                      <p className="text-gray-400 text-sm">{contact.email}</p>
                    </div>
                    {!contact.isRead && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <FaClock />
                      {formatDate(contact.createdAt)}
                    </span>
                    <button
                      onClick={() => handleReply(contact)}
                      className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                      title="Reply to message"
                    >
                      <FaReply />
                    </button>
                    <button
                      onClick={() => toggleReadStatus(contact._id, contact.isRead)}
                      className={`p-2 rounded-lg transition-colors ${
                        contact.isRead 
                          ? 'text-gray-400 hover:bg-slate-700' 
                          : 'text-blue-400 hover:bg-blue-500/20'
                      }`}
                      title={contact.isRead ? 'Mark as unread' : 'Mark as read'}
                    >
                      {contact.isRead ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact._id, contact.name)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Delete message"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-gray-300 leading-relaxed">{contact.message}</p>
                </div>

                {/* Reply Button - Only for unread messages */}
                {!contact.isRead && (
                  <div className="mt-4">
                    <button
                      onClick={() => handleReply(contact)}
                      className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 transition-all duration-300"
                    >
                      <FaReply />
                      Reply
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredContacts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FaInbox className="text-6xl text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm || filter !== 'all' ? 'No messages found' : 'No contact messages yet'}
            </h3>
            <p className="text-gray-400">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Contact messages will appear here when submitted'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Admin
