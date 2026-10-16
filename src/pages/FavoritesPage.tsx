import { Link } from 'react-router-dom';

import FavoriteButton from '../components/favorites/FavoriteButton';
import { useFavorites } from '../hooks/useFavorites';
import type { FavoriteItem } from '../types/favorite';
import '../styles/favorites.css';

function getFavoriteName(favorite: FavoriteItem): string {
  return 'name' in favorite.item ? favorite.item.name : favorite.item.title;
}

function getFavoriteLink(favorite: FavoriteItem): string {
  switch (favorite.type) {
    case 'country':
      return `/countries/${favorite.item.id}`;
    case 'city':
      return `/cities/${favorite.item.id}`;
    case 'attraction':
      return `/attractions/${favorite.item.id}`;
  }
}

function getFavoriteSubtitle(favorite: FavoriteItem): string {
  switch (favorite.type) {
    case 'country':
      return [favorite.item.region, favorite.item.capital].filter(Boolean).join(' · ');
    case 'city':
      return [favorite.item.countryName, favorite.item.region].filter(Boolean).join(' · ');
    case 'attraction':
      return 'Landmark and destination';
  }
}

function FavoritesPage() {
  const { favorites } = useFavorites();

  const countries = favorites.filter((item) => item.type === 'country').length;
  const cities = favorites.filter((item) => item.type === 'city').length;
  const attractions = favorites.filter((item) => item.type === 'attraction').length;

  return (
    <main className="favorites-page">
      <section className="favorites-hero">
        <span className="favorites-eyebrow">YOUR PERSONAL COLLECTION</span>
        <h1>Places worth keeping.</h1>
        <p>Your favorite countries, cities and remarkable places, all in one collection.</p>

        <div className="favorites-summary">
          <span>{countries} countries</span>
          <span>{cities} cities</span>
          <span>{attractions} places</span>
        </div>
      </section>

      <section className="favorites-content" aria-labelledby="favorites-heading">
        <div className="favorites-heading">
          <div>
            <span className="favorites-eyebrow">SAVED BY YOU</span>
            <h2 id="favorites-heading">Your collection</h2>
          </div>

          <span className="favorites-count">
            {favorites.length} {favorites.length === 1 ? 'favorite' : 'favorites'}
          </span>
        </div>

        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <span className="favorites-empty__icon" aria-hidden="true">
              ♡
            </span>
            <h3>Your collection starts here.</h3>
            <p>Save places that catch your eye, and they’ll appear here for your next adventure.</p>

            <div className="favorites-empty__links">
              <Link to="/countries">Explore countries</Link>
              <Link to="/cities">Discover cities</Link>
              <Link to="/attractions">Find attractions</Link>
            </div>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((favorite) => (
              <article className="favorites-card" key={`${favorite.type}:${favorite.item.id}`}>
                <div className="favorites-card__visual">
                  {favorite.type === 'country' && favorite.item.flagUrl ? (
                    <img src={favorite.item.flagUrl} alt={`Flag of ${favorite.item.name}`} loading="lazy" />
                  ) : favorite.type === 'attraction' && favorite.item.imageUrl ? (
                    <img src={favorite.item.imageUrl} alt="" loading="lazy" />
                  ) : (
                    <span aria-hidden="true">
                      {favorite.type === 'country' ? favorite.item.flag || '🌍' : favorite.type === 'city' ? '⌖' : '✦'}
                    </span>
                  )}
                </div>

                <div className="favorites-card__body">
                  <span className="favorites-card__type">{favorite.type}</span>
                  <h3>{getFavoriteName(favorite)}</h3>
                  <p>{getFavoriteSubtitle(favorite) || 'Discover this place'}</p>

                  <div className="favorites-card__actions">
                    <Link className="favorites-card__link" to={getFavoriteLink(favorite)}>
                      Explore <span aria-hidden="true">↗</span>
                    </Link>

                    <FavoriteButton favorite={favorite} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default FavoritesPage;
