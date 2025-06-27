import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Shared/Navbar/Navbar'
import Footer from '../Shared/Footer/Footer'

const Root = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <Navbar />
        <main className="min-h-[calc(100vh-128px)]">
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Root