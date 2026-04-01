import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";

export default function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const leftNav = [
    { path: "/om-oss", label: t("nav.about") },
    { path: "/produkt", label: t("nav.product") },
    { path: "/hva-skjer", label: t("nav.events") },
  ];

  const rightNav = [
    {
      href: "https://www.facebook.com/takkaas",
      label: "Facebook",
      external: true,
    },
    {
      href: "https://www.instagram.com/takkaas",
      label: "Instagram",
      external: true,
    },
    { path: "/kontakt-oss", label: t("nav.contact"), external: false },
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
            {leftNav.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
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

        {/* Mobile menu */}
        <div
          ref={menuRef}
          id="main-nav"
          className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        >
          <ul className={styles.mobileList} role="list">
            {leftNav.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={styles.navLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
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
          </ul>
        </div>
      </div>
    </header>
  );
}
