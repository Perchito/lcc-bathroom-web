import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Contact from './components/Contact.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import Gallery from './pages/Gallery.jsx'
import Reviews from './pages/Reviews.jsx'
import { useReveal } from './useReveal.js'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  useReveal()
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route
            path="/gallery"
            element={<Gallery key="luxury" defaultSector="luxury" />}
          />
          <Route
            path="/council-bathrooms"
            element={<Gallery key="council" defaultSector="council" />}
          />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Contact />
      <Footer />
    </>
  )
}
