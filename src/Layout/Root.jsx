import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Shared/Navbar/Navbar'
import Footer from '../Shared/Footer/Footer'
import ScrollToTop from '../components/ScrollToTop'
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
    <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#000000,#111111,#0a0a0a)] bg-fixed">
        <ScrollToTop />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(50,50,50,0.1),transparent_80%)] pointer-events-none"></div>
        <Navbar />
        <main className="min-h-[calc(100vh-128px)] relative z-10">
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Root