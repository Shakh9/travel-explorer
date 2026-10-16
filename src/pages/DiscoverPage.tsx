import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/discover.css';

const destinations = [
  {
    number: '01',
    title: 'Countries',
    description: 'Explore countries around the world, their cultures, capitals and fascinating facts.',
    path: '/countries',
    label: 'Explore countries',
    visual: 'discover-tile--countries',
    symbol: '◎',
  },
  {
    number: '02',
    title: 'Cities',
    description: 'Discover cities, learn about their locations and find your next destination.',
    path: '/cities',
    label: 'Discover cities',
    visual: 'discover-tile--cities',
    symbol: '⌖',
  },
  {
    number: '03',
    title: 'Attractions',
    description: 'Find remarkable landmarks and places worth adding to your travel wishlist.',
    path: '/attractions',
    label: 'Find attractions',
    visual: 'discover-tile--attractions',
    symbol: '✳',
  },
];

function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchTerm.trim();

    if (!query) {
      return;
    }

    navigate(`/attractions?search=${encodeURIComponent(query)}`);
  }

  return (
    <main className="discover-page">
      <section className="discover-hero">
        <div className="discover-hero__content">
          <span className="discover-eyebrow">YOUR NEXT ADVENTURE STARTS HERE</span>

          <h1>
            The world is
            <br />
            <span>worth discovering.</span>
          </h1>

          <p className="discover-hero__description">
            Explore countries, uncover remarkable cities and find places that make you want to pack your bags.
          </p>

          <form className="discover-search" onSubmit={handleSearch}>
            <span className="discover-search__icon" aria-hidden="true">
              ⌕
            </span>

            <label className="discover-search__label" htmlFor="discover-search">
              Search destinations
            </label>

            <input
              id="discover-search"
              type="search"
              placeholder="Try Rome, Japan or the Eiffel Tower..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <button type="submit">Discover ↗</button>
          </form>

          <p className="discover-hero__note">No bookings. No rush. Just explore.</p>
        </div>

        <div className="discover-hero__art" aria-hidden="true">
          <div className="discover-orbit discover-orbit--outer" />
          <div className="discover-orbit discover-orbit--inner" />

          <div className="discover-globe">
            <span className="discover-globe__latitude discover-globe__latitude--one" />
            <span className="discover-globe__latitude discover-globe__latitude--two" />
            <span className="discover-globe__longitude" />
            <span className="discover-globe__land discover-globe__land--one" />
            <span className="discover-globe__land discover-globe__land--two" />
            <span className="discover-globe__land discover-globe__land--three" />
          </div>

          <span className="discover-art-label discover-art-label--top">THE WORLD IS YOURS</span>

          <span className="discover-art-label discover-art-label--bottom">01° — 180°</span>

          <span className="discover-art-star discover-art-star--one">✳</span>
          <span className="discover-art-star discover-art-star--two">✦</span>
        </div>

        <div className="discover-hero__index" aria-hidden="true">
          <span>EXPLORE THE UNEXPECTED</span>
          <span>01 / 03</span>
        </div>
      </section>

      <section className="discover-collections">
        <div className="discover-section-heading">
          <div>
            <span className="discover-eyebrow">START EXPLORING</span>
            <h2>Where will you go?</h2>
          </div>

          <p>
            A world of places to discover.
            <br />
            Your next story starts with one.
          </p>
        </div>

        <div className="discover-grid">
          {destinations.map((destination) => (
            <article className={`discover-tile ${destination.visual}`} key={destination.path}>
              <div className="discover-tile__top">
                <span className="discover-tile__number">{destination.number}</span>

                <span className="discover-tile__symbol" aria-hidden="true">
                  {destination.symbol}
                </span>
              </div>

              <div className="discover-tile__body">
                <h3>{destination.title}</h3>
                <p>{destination.description}</p>

                <Link className="discover-tile__link" to={destination.path}>
                  {destination.label}
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="discover-favorites">
        <div className="discover-favorites__icon" aria-hidden="true">
          ♡
        </div>

        <div className="discover-favorites__content">
          <span className="discover-eyebrow">YOUR PERSONAL COLLECTION</span>
          <h2>Keep the places that inspire you.</h2>
          <p>Save countries, cities and remarkable places to build your own collection of future adventures.</p>
        </div>

        <Link className="discover-favorites__link" to="/favorites">
          View favorites <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}

export default DiscoverPage;
