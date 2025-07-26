import React, { useState, useEffect } from 'react'
import { FaUsers, FaClock, FaCalendarAlt, FaGlobe, FaMobileAlt, FaDesktop, FaChrome, FaFirefox, FaSafari, FaEdge, FaSearch, FaFilter, FaSortAmountDown, FaExclamationTriangle, FaSync } from 'react-icons/fa'
import { visitorsAPI } from '../../../utils/api'
import useAuth from '../../../Hooks/useAuth'

const Users = () => {
  const [visitors, setVisitors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date') // 'date', 'visits', 'timeSpent'
  const { user } = useAuth()

  useEffect(() => {
    fetchVisitorData()
  }, [user])

  const fetchVisitorData = async () => {
    if (!user?.email) return;
    
    try {
      setLoading(true)
      setError(null)
      
      const response = await visitorsAPI.getAll(user.email)
      if (response.success) {
        setVisitors(response.data || [])
      } else {
        setError(response.message || 'Failed to fetch visitor data')
      }
    } catch (err) {
      console.error('Error fetching visitor data:', err)
      setError('Error connecting to server. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  // Format duration from seconds to readable time
  const formatDuration = (seconds) => {
    if (!seconds) return '0s'
    
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    
    let result = ''
    if (hours > 0) result += `${hours}h `
    if (minutes > 0) result += `${minutes}m `
    if (remainingSeconds > 0 || result === '') result += `${remainingSeconds}s`
    
    return result.trim()
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  // Filter visitors based on search term and date filter
  const filteredVisitors = visitors.filter(visitor => {
    // Search filter
    const matchesSearch = 
      (visitor.ip && visitor.ip.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (visitor.browser && visitor.browser.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (visitor.device && visitor.device.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (visitor.os && visitor.os.toLowerCase().includes(searchTerm.toLowerCase()))
    
    // Date filter
    let matchesDate = true
    if (dateFilter !== 'all' && visitor.lastVisit) {
      const now = new Date()
      const visitDate = new Date(visitor.lastVisit)
      
      if (dateFilter === 'today') {
        matchesDate = visitDate.toDateString() === now.toDateString()
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(now)
        weekAgo.setDate(now.getDate() - 7)
        matchesDate = visitDate >= weekAgo
      } else if (dateFilter === 'month') {
        const monthAgo = new Date(now)
        monthAgo.setMonth(now.getMonth() - 1)
        matchesDate = visitDate >= monthAgo
      }
    }
    
    return matchesSearch && matchesDate
  })

  // Sort visitors
  const sortedVisitors = [...filteredVisitors].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.lastVisit || 0) - new Date(a.lastVisit || 0)
    } else if (sortBy === 'visits') {
      return (b.visitCount || 0) - (a.visitCount || 0)
    } else if (sortBy === 'timeSpent') {
      return (b.totalTimeSpent || 0) - (a.totalTimeSpent || 0)
    }
    return 0
  })

  // Get visitor statistics
  const stats = {
    total: visitors.length,
    totalVisits: visitors.reduce((sum, visitor) => sum + (visitor.visitCount || 0), 0),
    uniqueIPs: new Set(visitors.map(visitor => visitor.ip)).size,
    averageTimeSpent: visitors.length 
      ? Math.round(visitors.reduce((sum, visitor) => sum + (visitor.totalTimeSpent || 0), 0) / visitors.length) 
      : 0
  }

  // Get browser statistics
  const browserStats = visitors.reduce((acc, visitor) => {
    if (visitor.browser) {
      const browserName = visitor.browser.split(' ')[0].toLowerCase()
      acc[browserName] = (acc[browserName] || 0) + 1
    }
    return acc
  }, {})

  // Get device statistics
  const deviceStats = visitors.reduce((acc, visitor) => {
    if (visitor.device) {
      const device = visitor.device.toLowerCase().includes('mobile') ? 'mobile' : 'desktop'
      acc[device] = (acc[device] || 0) + 1
    }
    return acc
  }, {})

  // Browser icon selector
  const getBrowserIcon = (browser) => {
    if (!browser) return <FaGlobe className="text-lg text-gray-400" />;
    
    const browserName = browser.toLowerCase()
    if (browserName.includes('chrome')) return <FaChrome className="text-lg text-blue-400" />
    if (browserName.includes('firefox')) return <FaFirefox className="text-lg text-orange-400" />
    if (browserName.includes('safari')) return <FaSafari className="text-lg text-blue-400" />
    if (browserName.includes('edge')) return <FaEdge className="text-lg text-blue-500" />
    return <FaGlobe className="text-lg text-gray-400" />
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 text-center">
        <FaExclamationTriangle className="text-yellow-500 text-5xl mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Error Loading Visitor Data</h3>
        <p className="text-gray-400 mb-6">{error}</p>
        <button 
          onClick={fetchVisitorData}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mx-auto transition-colors"
        >
          <FaSync className="text-sm" />
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white mb-2">Visitor Tracking</h1>
        <p className="text-gray-400 text-sm">Monitor visitor activity and analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-xs">Total Visitors</span>
            <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center">
              <FaUsers className="text-blue-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{stats.uniqueIPs}</div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-xs">Total Visits</span>
            <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center">
              <FaCalendarAlt className="text-green-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalVisits}</div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-xs">Avg. Time</span>
            <div className="w-8 h-8 rounded-full bg-orange-900/30 flex items-center justify-center">
              <FaClock className="text-orange-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{formatDuration(stats.averageTimeSpent)}</div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-xs">Devices</span>
            <div className="flex gap-1">
              <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center">
                <FaDesktop className="text-purple-400" />
              </div>
            </div>
          </div>
          <div className="text-sm font-semibold text-white flex justify-between">
            <div>Desktop: {deviceStats.desktop || 0}</div>
            <div>Mobile: {deviceStats.mobile || 0}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative w-full sm:flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              placeholder="Search by IP or browser..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
            {/* Date Filter */}
            <div className="flex items-center gap-2 w-full xs:w-auto">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            
            {/* Sort By */}
            <div className="flex items-center gap-2 w-full xs:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="date">Latest Visit</option>
                <option value="visits">Most Visits</option>
                <option value="timeSpent">Most Time Spent</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {visitors.length === 0 ? (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-8 text-center">
          <FaUsers className="text-gray-600 text-5xl mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-white mb-2">No Visitor Data Yet</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Your visitor tracking system is working, but no visitor data has been recorded yet. 
            Data will appear here as people visit your site.
          </p>
        </div>
      ) : (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-slate-700/70 border-b border-slate-600">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">IP Address</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Visits</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">First Visit</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Visit</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Time Spent</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Browser/Device</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {sortedVisitors.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-400">No visitors match your search criteria</td>
                  </tr>
                ) : (
                  sortedVisitors.map((visitor, index) => (
                    <tr key={index} className="hover:bg-slate-700/30">
                      <td className="py-3 px-4 text-sm font-medium text-white">{visitor.ip || '-'}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{visitor.visitCount || 0}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{formatDate(visitor.firstVisit)}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{formatDate(visitor.lastVisit)}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{formatDuration(visitor.totalTimeSpent)}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">
                        <div className="flex items-center">
                          {getBrowserIcon(visitor.browser)}
                          <span className="ml-2">{visitor.browser || '-'} / {visitor.device || '-'}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users