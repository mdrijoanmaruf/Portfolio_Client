import React, { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { FaHome, FaPlus, FaUsers, FaProjectDiagram, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'
import useAuth from '../Hooks/useAuth'
import AOS from 'aos'
import 'aos/dist/aos.css'

const DashboardLayout = () => {
  const { user, logOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)
  
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out',
    })
  }, [])

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
    <div className="flex flex-col h-screen bg-[linear-gradient(to_bottom_right,#000000,#111111,#0a0a0a)] bg-fixed">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-xl border-b border-slate-700/40 shadow-lg shadow-blue-900/10">
        <div className="flex items-center justify-between h-16 px-4 md:px-8">
          {/* Left: Logo & Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDrawer}
              className="lg:hidden p-2 text-white rounded-full hover:bg-slate-800/60 transition-colors shadow-md"
              aria-label="Toggle menu"
            >
              {drawerOpen ? <FaTimes /> : <FaBars />}
            </button>
            <Link to="/" className="flex items-center gap-2 group">
              <span className="bg-gradient-to-tr from-blue-500 via-cyan-400 to-purple-500 h-9 w-9 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <FaProjectDiagram className="text-white text-xl" />
              </span>
              <span className="text-white font-extrabold text-lg md:text-2xl tracking-tight group-hover:text-cyan-300 transition-colors">Admin Dashboard</span>
            </Link>
          </div>

          {/* Center: Page Title (optional, can be dynamic) */}
          {/* <div className="hidden md:block">
            <span className="text-cyan-300 font-semibold text-lg">Dashboard</span>
          </div> */}

          {/* Right: User Info & Logout */}
          <div className="flex items-center gap-3">
            {user?.email && (
              <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-900/60 to-blue-800/30 px-4 py-2 rounded-xl border border-blue-700/40 shadow-md">
                <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center shadow-inner">
                  <FaUsers className="text-cyan-300 text-base" />
                </div>
                <span className="text-cyan-200 text-sm font-semibold truncate max-w-[180px]">{user.email}</span>
              </div>
            )}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-500 hover:from-pink-500 hover:to-red-600 text-white px-3 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-900/20 hover:scale-105 active:scale-95"
            >
              <FaSignOutAlt className="text-base" /> 
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative overflow-hidden">
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
          } fixed top-14 bottom-0 lg:sticky lg:top-14 w-[220px] bg-black/80 backdrop-blur-md border-r border-slate-700/50 transition-transform duration-300 ease-in-out z-20 lg:z-10 flex-shrink-0 flex flex-col h-[calc(100vh-3.5rem)]`}
        >
          {/* User info on mobile */}
          <div className="lg:hidden p-3">
            <div className="bg-slate-800/60 rounded-lg p-2 border border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <FaUsers className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm truncate">{user?.email}</h3>
                  <p className="text-gray-400 text-xs">Admin User</p>
                </div>
              </div>
            </div>
          </div>

          {/* Nav Menu */}
          <div className="flex-1 overflow-y-auto px-3 py-2">
            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2 ml-1">Menu</h3>
            <nav className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={closeDrawer}
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 ${
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
          </div>
          
          {/* Back to Site Link - Fixed at Bottom */}
          <div className="px-3 py-4 border-t border-slate-700/30">
            <Link
              to="/"
              onClick={closeDrawer}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-gray-400 hover:bg-slate-800/40 hover:text-white transition-all duration-200"
            >
              <FaHome className="text-gray-400" />
              <span className="text-sm">Back to Site</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-3 md:p-4 w-full overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout