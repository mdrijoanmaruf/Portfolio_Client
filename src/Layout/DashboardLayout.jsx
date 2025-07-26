import React, { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { FaHome, FaPlus, FaUsers, FaProjectDiagram, FaEnvelope, FaSignOutAlt, FaBars, FaTimes, FaCog } from 'react-icons/fa'
import useAuth from '../Hooks/useAuth'

const DashboardLayout = () => {
  const { user, logOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  const handleLogout = async () => {
    await logOut()
    navigate('/')
  }

  const navItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <FaHome className="text-blue-400" />
    },
    {
      path: '/dashboard/add-project',
      name: 'Add Project',
      icon: <FaPlus className="text-green-400" />
    },
    {
      path: '/dashboard/visitors',
      name: 'Visitors',
      icon: <FaUsers className="text-orange-400" />
    },
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(to_bottom_right,#000000,#111111,#0a0a0a)] bg-fixed">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-black/70 backdrop-blur-md border-b border-slate-700/50 shadow-md">
        <div className="flex items-center justify-between h-14 px-3 md:px-5">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDrawer}
              className="lg:hidden p-2 text-white rounded-md hover:bg-slate-800/50 transition-colors"
              aria-label="Toggle menu"
            >
              {drawerOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className="flex items-center">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 h-5 w-1 rounded-full mr-2"></span>
              <Link to="/" className="text-white font-bold text-lg">
                Admin Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            {user?.email && (
              <div className="hidden md:flex items-center gap-2 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <FaUsers className="text-blue-400 text-xs" />
                </div>
                <span className="text-blue-400 text-sm font-medium truncate max-w-[150px]">{user.email}</span>
              </div>
            )}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1 md:gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white px-2 md:px-3 py-1.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-red-900/20"
            >
              <FaSignOutAlt className="text-xs" /> 
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Backdrop overlay when drawer is open on mobile */}
        {drawerOpen && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-20 lg:hidden"
            onClick={closeDrawer}
            aria-label="Close menu"
          ></div>
        )}

        {/* Sidebar Drawer */}
        <aside 
          className={`${
            drawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } fixed top-14 bottom-0 lg:sticky lg:top-14 w-[240px] bg-black/80 backdrop-blur-md border-r border-slate-700/50 transition-transform duration-300 ease-in-out z-20 lg:z-10 flex-shrink-0 flex flex-col h-[calc(100vh-3.5rem)] overflow-y-auto`}
        >
          {/* User info on mobile */}
          <div className="lg:hidden p-4">
            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <FaUsers className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm truncate">{user?.email}</h3>
                  <p className="text-gray-400 text-xs">Admin User</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-3">
            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2 ml-2">Main Menu</h3>
            <nav className="flex flex-col gap-1.5 mb-8">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={closeDrawer}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-900/60 to-blue-800/30 text-white border border-blue-700/50 shadow-lg shadow-blue-900/20'
                      : 'text-gray-400 hover:bg-slate-800/40 hover:text-white border border-transparent'
                  }`}
                >
                  <span className={`text-base ${isActive(item.path) ? 'text-white' : ''}`}>{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
            </nav>

            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2 ml-2 mt-6">Quick Links</h3>
            <div className="flex flex-col gap-1.5">
              <Link
                to="/"
                onClick={closeDrawer}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-slate-800/40 hover:text-white border border-transparent transition-all duration-200"
              >
                <FaHome className="text-base text-gray-400" />
                <span className="text-sm">Back to Site</span>
              </Link>
              <Link
                to="/dashboard"
                onClick={closeDrawer}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-slate-800/40 hover:text-white border border-transparent transition-all duration-200"
              >
                <FaCog className="text-base text-gray-400" />
                <span className="text-sm">Settings</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-3 md:p-4 lg:p-5 w-full overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout