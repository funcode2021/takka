import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useEffect, lazy, Suspense } from "react";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // Small delay to let the DOM render before scrolling
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import styles from "./App.module.css";

const ProductPage = lazy(() => import("./pages/ProductPage/ProductPage"));
const EventPage = lazy(() => import("./pages/EventPage/EventPage"));
const EventDetailPage = lazy(() => import("./pages/EventPage/EventDetailPage"));

function AppContent() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className={styles.app}>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        {t("skip")}
      </a>
      <Header />
      <main id="main-content" className={styles.main}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/om-oss"
              element={<Navigate to="/#om-oss" replace />}
            />
            <Route
              path="/kontakt-oss"
              element={<Navigate to="/#kontakt-oss" replace />}
            />
            <Route path="/produkt" element={<ProductPage />} />
            <Route path="/hva-skjer" element={<EventPage />} />
            <Route path="/hva-skjer/:slug" element={<EventDetailPage />} />
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
