import React, { useState, useEffect } from 'react'
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
      <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#000000,#111111,#0a0a0a)] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#000000,#111111,#0a0a0a)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading contact messages...</p>
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
          <p className="text-gray-400 text-xs sm:text-sm">Manage contact form submissions</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3 mb-3 sm:mb-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-2 sm:p-3 text-center">
            <FaInbox className="text-base sm:text-xl text-blue-400 mx-auto mb-0.5 sm:mb-1" />
            <div className="text-base sm:text-lg font-bold text-white">{stats.total}</div>
            <div className="text-gray-400 text-[10px] xs:text-xs">Total</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-2 sm:p-3 text-center">
            <FaEnvelopeOpen className="text-base sm:text-xl text-green-400 mx-auto mb-0.5 sm:mb-1" />
            <div className="text-base sm:text-lg font-bold text-white">{stats.read}</div>
            <div className="text-gray-400 text-[10px] xs:text-xs">Read</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-2 sm:p-3 text-center">
            <FaEnvelope className="text-base sm:text-xl text-orange-400 mx-auto mb-0.5 sm:mb-1" />
            <div className="text-base sm:text-lg font-bold text-white">{stats.unread}</div>
            <div className="text-gray-400 text-[10px] xs:text-xs">Unread</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
          <div className="flex flex-col xs:flex-row gap-2 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full xs:w-auto">
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-7 pr-2 py-1.5 bg-slate-700/50 border border-slate-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-xs sm:text-sm"
              />
            </div>
            
            {/* Filter */}
            <div className="flex items-center w-full xs:w-auto">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full xs:w-auto bg-slate-700/50 border border-slate-600 rounded px-2 py-1.5 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Messages */}
        <div className="space-y-4 sm:space-y-5">
          {filteredContacts.map((contact, index) => (
            <div
              key={contact._id}
              className={`relative group bg-gradient-to-br from-slate-800/70 to-blue-900/30 border rounded-2xl p-3 sm:p-4 shadow-lg transition-all duration-300 hover:shadow-blue-900/30 hover:border-blue-500/60 ${
                contact.isRead ? 'border-slate-700' : 'border-blue-500/40 ring-2 ring-blue-500/20'
              }`}
            >
              {/* New badge */}
              {!contact.isRead && (
                <span className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-[9px] xs:text-xs px-2 py-0.5 rounded-full font-bold shadow-md animate-pulse z-10">
                  New
                </span>
              )}
              <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-2 xs:gap-0 mb-2">
                {/* Contact info */}
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-inner border-2 ${
                    contact.isRead ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-tr from-blue-500 to-cyan-400 border-blue-400'
                  }`}>
                    <FaUser className="text-white text-base sm:text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-sm sm:text-base truncate">{contact.name}</h3>
                    <p className="text-cyan-200 text-xs truncate max-w-[160px] sm:max-w-[220px]">{contact.email}</p>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex justify-between xs:justify-end items-center w-full xs:w-auto gap-2">
                  <span className="text-gray-400 text-xs flex items-center gap-1 mr-1">
                    <FaClock className="text-xs" />
                    <span className="hidden xs:inline-block">
                      {formatDate(contact.createdAt)}
                    </span>
                    <span className="xs:hidden">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleReply(contact)}
                      className="p-1.5 text-cyan-400 bg-cyan-900/10 hover:bg-cyan-500/20 rounded-full transition-colors shadow-sm"
                      title="Reply to message"
                    >
                      <FaReply className="text-xs sm:text-base" />
                    </button>
                    <button
                      onClick={() => toggleReadStatus(contact._id, contact.isRead)}
                      className={`p-1.5 rounded-full transition-colors shadow-sm ${
                        contact.isRead 
                          ? 'text-gray-400 bg-slate-700/60 hover:bg-slate-600' 
                          : 'text-blue-400 bg-blue-900/20 hover:bg-blue-500/20'
                      }`}
                      title={contact.isRead ? 'Mark as unread' : 'Mark as read'}
                    >
                      {contact.isRead ? <FaEyeSlash className="text-xs sm:text-base" /> : <FaEye className="text-xs sm:text-base" />}
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact._id, contact.name)}
                      className="p-1.5 text-red-400 bg-red-900/10 hover:bg-red-500/20 rounded-full transition-colors shadow-sm"
                      title="Delete message"
                    >
                      <FaTrash className="text-xs sm:text-base" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-slate-700/40 rounded-xl p-3 text-xs sm:text-sm mt-1 border border-slate-700/60">
                <p className="text-gray-200 leading-relaxed line-clamp-4 xs:line-clamp-3">{contact.message}</p>
              </div>
              {/* Reply Button - Only for unread messages */}
              {!contact.isRead && (
                <div className="mt-3">
                  <button
                    onClick={() => handleReply(contact)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl px-3 py-2 transition-all duration-300 text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95"
                  >
                    <FaReply className="text-xs sm:text-sm" />
                    Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredContacts.length === 0 && (
          <div className="text-center py-6">
            <FaInbox className="text-3xl sm:text-4xl text-gray-500 mx-auto mb-2 sm:mb-3" />
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
              {searchTerm || filter !== 'all' ? 'No messages found' : 'No contact messages yet'}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm px-4">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Contact messages will appear here when submitted'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
