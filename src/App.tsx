import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage'
import AboutPage from './pages/AboutPage/AboutPage'
import ProductPage from './pages/ProductPage/ProductPage'
import EventPage from './pages/EventPage/EventPage'
import ContactPage from './pages/ContactPage/ContactPage'
import styles from './App.module.css'

function AppContent() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t('skip')}
      </a>
      <Header />
      <main id="main-content" className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/om-oss" element={<AboutPage />} />
          <Route path="/produkt" element={<ProductPage />} />
          <Route path="/hva-skjer" element={<EventPage />} />
          <Route path="/kontakt-oss" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  )
}
