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
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#000000,#111111,#0a0a0a)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading contact messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#000000,#111111,#0a0a0a)] py-4">
      <div className="max-w-7xl mx-auto px-3">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            Admin <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Dashboard</span>
          </h1>
          <p className="text-gray-400 text-sm">Manage contact form submissions</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-center">
            <FaInbox className="text-xl text-blue-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-white">{stats.total}</div>
            <div className="text-gray-400 text-xs">Total</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-center">
            <FaEnvelopeOpen className="text-xl text-green-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-white">{stats.read}</div>
            <div className="text-gray-400 text-xs">Read</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-center">
            <FaEnvelope className="text-xl text-orange-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-white">{stats.unread}</div>
            <div className="text-gray-400 text-xs">Unread</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 mb-4">
          <div className="flex flex-row gap-2 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-7 pr-2 py-1.5 bg-slate-700/50 border border-slate-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
            
            {/* Filter */}
            <div className="flex items-center">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-slate-700/50 border border-slate-600 rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Messages */}
        <div className="space-y-2">
          {filteredContacts.map((contact, index) => (
            <div
              key={contact._id}
              className={`bg-slate-800/50 backdrop-blur-sm border rounded-lg p-3 transition-all duration-300 hover:border-blue-500/50 ${
                contact.isRead ? 'border-slate-700' : 'border-blue-500/30 bg-blue-900/10'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    contact.isRead ? 'bg-gray-600' : 'bg-blue-500'
                  }`}>
                    <FaUser className="text-white text-xs" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">{contact.name}</h3>
                    <p className="text-gray-400 text-xs">{contact.email}</p>
                  </div>
                  {!contact.isRead && (
                    <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full text-[10px]">
                      New
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-1">
                  <span className="text-gray-400 text-xs flex items-center gap-1 mr-1">
                    <FaClock className="text-[10px]" />
                    {formatDate(contact.createdAt)}
                  </span>
                  <button
                    onClick={() => handleReply(contact)}
                    className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded transition-colors"
                    title="Reply to message"
                  >
                    <FaReply className="text-xs" />
                  </button>
                  <button
                    onClick={() => toggleReadStatus(contact._id, contact.isRead)}
                    className={`p-1.5 rounded transition-colors ${
                      contact.isRead 
                        ? 'text-gray-400 hover:bg-slate-700' 
                        : 'text-blue-400 hover:bg-blue-500/20'
                    }`}
                    title={contact.isRead ? 'Mark as unread' : 'Mark as read'}
                  >
                    {contact.isRead ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact._id, contact.name)}
                    className="p-1.5 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                    title="Delete message"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-700/30 rounded p-2 text-xs">
                <p className="text-gray-300 leading-relaxed">{contact.message}</p>
              </div>

              {/* Reply Button - Only for unread messages */}
              {!contact.isRead && (
                <div className="mt-2">
                  <button
                    onClick={() => handleReply(contact)}
                    className="w-full flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded px-2 py-1 transition-all duration-300 text-xs"
                  >
                    <FaReply className="text-xs" />
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
            <FaInbox className="text-4xl text-gray-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-1">
              {searchTerm || filter !== 'all' ? 'No messages found' : 'No contact messages yet'}
            </h3>
            <p className="text-gray-400 text-sm">
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
