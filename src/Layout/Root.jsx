import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Shared/Navbar/Navbar'
import Footer from '../Shared/Footer/Footer'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Root = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out',
    })
  }, [])
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