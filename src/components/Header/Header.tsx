import { useState, useRef, useEffect, useCallback } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";

export default function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToHash = useCallback(
    (hash: string) => {
      setMenuOpen(false);
      if (location.pathname === "/") {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/#" + hash);
      }
    },
    [location.pathname, navigate],
  );

  const leftNav: Array<
    { label: string } & (
      | { path: string; hash?: undefined }
      | { hash: string; path?: undefined }
    )
  > = [
    { hash: "om-oss", label: t("nav.about") },
    { path: "/produkt", label: t("nav.product") },
    { path: "/hva-skjer", label: t("nav.events") },
  ];

  const rightNav = [
    {
      href: "https://www.facebook.com/people/TAKKA/61580737300168/?mibextid=wwXIfr&rdid=JGCTfzk6aNGOn1cs&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DWx59BcdQ%2F%3Fmibextid%3DwwXIfr",
      label: "Facebook",
      external: true as const,
    },
    {
      href: "https://www.instagram.com/rett_fra_takka",
      label: "Instagram",
      external: true as const,
    },
    { hash: "kontakt-oss", label: t("nav.contact"), external: false as const },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        {/* Left nav */}
        <nav aria-label="Primær navigasjon" className={styles.navLeft}>
          <ul className={styles.navList} role="list">
            {leftNav.map((item) => (
              <li key={item.hash ?? item.path}>
                {item.hash ? (
                  <button
                    type="button"
                    className={styles.navLink}
                    onClick={() => scrollToHash(item.hash)}
                  >
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    to={item.path!}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Centered logo */}
        <NavLink
          to="/"
          className={styles.logo}
          aria-label="Takka – gå til forsiden"
        >
          <img src="/logo.svg" alt="Takka" className={styles.logoImg} />
        </NavLink>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className={`${styles.toggle} ${menuOpen ? styles.toggleOpen : ""}`}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={styles.toggleBar} aria-hidden="true" />
          <span className={styles.toggleBar} aria-hidden="true" />
          <span className={styles.toggleBar} aria-hidden="true" />
        </button>

        {/* Right nav */}
        <nav aria-label="Sekundær navigasjon" className={styles.navRight}>
          <ul className={styles.navList} role="list">
            {rightNav.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                    aria-label={t(`social.${item.label.toLowerCase()}`)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={styles.navLink}
                    onClick={() => scrollToHash(item.hash!)}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu */}
        <div
          ref={menuRef}
          id="main-nav"
          className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        >
          <ul className={styles.mobileList} role="list">
            {leftNav.map((item) => (
              <li key={item.hash ?? item.path}>
                {item.hash ? (
                  <button
                    type="button"
                    className={styles.navLink}
                    onClick={() => scrollToHash(item.hash)}
                  >
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    to={item.path!}
                    className={styles.navLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
            {rightNav.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={styles.navLink}
                    onClick={() => scrollToHash(item.hash!)}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
