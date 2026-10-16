import { Link, useParams } from 'react-router-dom';

import { useCities } from '../hooks/useCities';
import '../styles/city-details.css';

function formatPopulation(population: number): string {
  return new Intl.NumberFormat('en-US').format(population);
}

function CityDetailsPage() {
  const { cityId } = useParams<{ cityId: string }>();
  const { data: cities, isLoading, isError, error, refetch } = useCities();

  if (isLoading) {
    return (
      <main className="city-details-page">
        <div className="city-details-message" role="status">
          <span className="city-details-spinner" />
          <h1>Discovering your destination...</h1>
          <p>Loading city information.</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="city-details-page">
        <div className="city-details-message" role="alert">
          <span className="city-details-eyebrow">SOMETHING WENT WRONG</span>
          <h1>We couldn’t load this city.</h1>
          <p>{error.message}</p>
          <button className="city-details-button" type="button" onClick={() => void refetch()}>
            Try again
          </button>
        </div>
      </main>
    );
  }

  const city = cities?.find((item) => item.id === cityId);

  if (!city) {
    return (
      <main className="city-details-page">
        <div className="city-details-message">
          <span className="city-details-eyebrow">DESTINATION NOT FOUND</span>
          <h1>We can’t find this city.</h1>
          <p>It may not be included in the current city collection.</p>
          <Link className="city-details-button" to="/cities">
            Back to cities
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="city-details-page">
      <Link className="city-details-back" to="/cities">
        <span aria-hidden="true">←</span> Back to all cities
      </Link>

      <section className="city-details-hero">
        <div className="city-details-hero__content">
          <span className="city-details-eyebrow">EXPLORE THE WORLD</span>
          <span className="city-details-country">
            <span aria-hidden="true">◎</span> {city.countryName}
          </span>
          <h1>{city.name}</h1>
          {city.region && <p className="city-details-region">{city.region}</p>}
          <p className="city-details-intro">
            Discover the location, population and geographical details of {city.name}.
          </p>
        </div>

        <div className="city-details-hero__art" aria-hidden="true">
          <div className="city-details-globe">
            <span className="city-details-globe__line city-details-globe__line--one" />
            <span className="city-details-globe__line city-details-globe__line--two" />
            <span className="city-details-globe__dot" />
          </div>
          <span className="city-details-country-code">{city.countryCode.toUpperCase()}</span>
        </div>
      </section>

      <section className="city-details-overview" aria-labelledby="overview-heading">
        <div className="city-details-section-heading">
          <span className="city-details-eyebrow">AT A GLANCE</span>
          <h2 id="overview-heading">City overview</h2>
          <p>Essential information about this destination.</p>
        </div>

        <div className="city-details-stats">
          <article className="city-details-stat">
            <span className="city-details-stat__icon" aria-hidden="true">
              ♙
            </span>
            <span className="city-details-stat__label">Population</span>
            <strong>{formatPopulation(city.population)}</strong>
            <span className="city-details-stat__note">Reported inhabitants</span>
          </article>

          <article className="city-details-stat">
            <span className="city-details-stat__icon" aria-hidden="true">
              ◉
            </span>
            <span className="city-details-stat__label">Country</span>
            <strong>{city.countryName}</strong>
            <span className="city-details-stat__note">Code: {city.countryCode.toUpperCase()}</span>
          </article>

          <article className="city-details-stat">
            <span className="city-details-stat__icon" aria-hidden="true">
              ⌖
            </span>
            <span className="city-details-stat__label">Latitude</span>
            <strong>
              {Number.isFinite(Number(city.latitude)) ? `${Number(city.latitude).toFixed(4)}°` : 'Unavailable'}
            </strong>
            <span className="city-details-stat__note">North–south position</span>
          </article>

          <article className="city-details-stat">
            <span className="city-details-stat__icon" aria-hidden="true">
              ⌖
            </span>
            <span className="city-details-stat__label">Longitude</span>
            <strong>
              {Number.isFinite(Number(city.longitude)) ? `${Number(city.longitude).toFixed(4)}°` : 'Unavailable'}
            </strong>
            <span className="city-details-stat__note">East–west position</span>
          </article>
        </div>
      </section>

      <section className="city-details-location">
        <div>
          <span className="city-details-eyebrow">FIND YOUR BEARINGS</span>
          <h2>Where in the world?</h2>
          <p>
            {city.name} is located in {city.countryName}
            {city.region ? `, in the ${city.region} region` : ''}.
          </p>
        </div>

        <a
          className="city-details-map-link"
          href={`https://www.openstreetmap.org/?mlat=${Number(city.latitude)}&mlon=${Number(city.longitude)}#map=10/${Number(city.latitude)}/${Number(city.longitude)}`}
          target="_blank"
          rel="noreferrer"
        >
          View on OpenStreetMap <span aria-hidden="true">↗</span>
        </a>
      </section>

      <div className="city-details-bottom">
        <p>Keep exploring. There’s always another place to discover.</p>
        <Link className="city-details-button" to="/cities">
          Explore more cities <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}

export default CityDetailsPage;
