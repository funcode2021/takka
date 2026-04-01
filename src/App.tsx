import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useEffect, lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import styles from "./App.module.css";

const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage"));
const ProductPage = lazy(() => import("./pages/ProductPage/ProductPage"));
const EventPage = lazy(() => import("./pages/EventPage/EventPage"));
const ContactPage = lazy(() => import("./pages/ContactPage/ContactPage"));

function AppContent() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className={styles.app}>
      <a href="#main-content" className="skip-link">
        {t("skip")}
      </a>
      <Header />
      <main id="main-content" className={styles.main}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/om-oss" element={<AboutPage />} />
            <Route path="/produkt" element={<ProductPage />} />
            <Route path="/hva-skjer" element={<EventPage />} />
            <Route path="/kontakt-oss" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}
