import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import './site-layout.css';

const navigationItems = [
  { label: 'Discover', to: '/' },
  { label: 'Countries', to: '/countries' },
  { label: 'Cities', to: '/cities' },
  { label: 'Attractions', to: '/attractions' },
  { label: 'Favorites', to: '/favorites' },
];

export default function SiteLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <div className="site-layout">
      <header className="site-header">
        <div className="site-header__inner">
          <NavLink className="site-brand" to="/" aria-label="Travel Explorer home" onClick={() => setIsMenuOpen(false)}>
            <span className="site-brand__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
                <path
                  d="M15.8 8.2L13.2 13.2L8.2 15.8L10.8 10.8L15.8 8.2Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span className="site-brand__text">
              Travel<span>Explorer</span>
            </span>
          </NavLink>

          <button
            className={`site-menu-toggle${isMenuOpen ? ' site-menu-toggle--open' : ''}`}
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            <span className="site-menu-toggle__line" />
            <span className="site-menu-toggle__line" />
            <span className="site-menu-toggle__line" />
          </button>

          <nav
            id="site-navigation"
            className={`site-nav${isMenuOpen ? ' site-nav--open' : ''}`}
            aria-label="Main navigation"
          >
            <div className="site-nav__mobile-heading">
              <span>EXPLORE THE WORLD</span>
              <span>Choose your destination</span>
            </div>

            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `site-nav__link${isActive ? ' site-nav__link--active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{item.label}</span>
                <span className="site-nav__arrow" aria-hidden="true">
                  ↗
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <div className="site-layout__content">
        <Outlet />
      </div>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <span>Travel Explorer</span>
          <span>
            Designed & Developed by <a href="https://ravinshakhmuradov.ru/">Ravin Shakhmuradov</a>.{' '}
          </span>
        </div>
      </footer>
    </div>
  );
}
