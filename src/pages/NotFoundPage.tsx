import { Link } from 'react-router-dom';

import '../styles/not-found.css';

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <div className="not-found-card__visual" aria-hidden="true">
          <span className="not-found-card__number">404</span>
          <span className="not-found-card__orbit not-found-card__orbit--one" />
          <span className="not-found-card__orbit not-found-card__orbit--two" />
          <span className="not-found-card__star">✳</span>
          <span className="not-found-card__dot" />
        </div>

        <div className="not-found-card__content">
          <span className="not-found-eyebrow">OFF THE MAP</span>

          <h1>Looks like you took a wrong turn.</h1>

          <p>This page seems to be off the map. The destination may have moved, or the address might be incorrect.</p>

          <div className="not-found-card__actions">
            <Link className="not-found-button not-found-button--primary" to="/">
              Back to Discover <span aria-hidden="true">↗</span>
            </Link>

            <Link className="not-found-button not-found-button--secondary" to="/countries">
              Explore countries
            </Link>
          </div>

          <span className="not-found-card__footnote">EVERY WRONG TURN CAN LEAD TO SOMETHING NEW</span>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
