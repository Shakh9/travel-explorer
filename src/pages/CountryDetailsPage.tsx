import { Link, useParams } from 'react-router-dom';

import { useCountries } from '../hooks/useCountries';
import '../styles/country-details.css';

function CountryDetailsPage() {
  const { countryId } = useParams();
  const { data: countries, isPending, isError, error } = useCountries();

  const country = countries?.find((item) => item.id.toLowerCase() === countryId?.toLowerCase());

  if (isPending) {
    return (
      <main className="country-details page-container">
        <p className="country-details__status">Loading country details...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="country-details page-container">
        <section className="country-details__message">
          <h1>Something went wrong</h1>
          <p>{error.message}</p>
          <Link to="/countries" className="country-details__back">
            ← All countries
          </Link>
        </section>
      </main>
    );
  }

  if (!country) {
    return (
      <main className="country-details page-container">
        <section className="country-details__message">
          <h1>Country not found</h1>
          <p>We couldn't find a country with this ID.</p>
          <Link to="/countries" className="country-details__back">
            ← All countries
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="country-details page-container">
      <Link to="/countries" className="country-details__back">
        ← All countries
      </Link>

      <section className="country-details__hero">
        <div className="country-details__identity">
          <span className="country-details__eyebrow">TRAVEL EXPLORER · COUNTRY GUIDE</span>

          <h1>{country.name}</h1>
          <p className="country-details__official-name">{country.officialName}</p>

          <div className="country-details__region">
            <span aria-hidden="true">◎</span>
            {country.region || 'Region unavailable'}
          </div>
        </div>

        <div className="country-details__flag-wrap">
          {country.flagUrl ? (
            <img className="country-details__flag" src={country.flagUrl} alt={`Flag of ${country.name}`} />
          ) : (
            <span className="country-details__flag-emoji" role="img" aria-label={`Flag of ${country.name}`}>
              {country.flag || '🌍'}
            </span>
          )}
        </div>
      </section>

      <section className="country-details__section">
        <span className="country-details__eyebrow">COUNTRY AT A GLANCE</span>
        <h2>Essential information</h2>

        <div className="country-details__stats">
          <article className="country-details__stat">
            <span className="country-details__stat-icon" aria-hidden="true">
              ◉
            </span>
            <span className="country-details__stat-label">Capital</span>
            <strong>{country.capital || 'Not available'}</strong>
          </article>

          <article className="country-details__stat">
            <span className="country-details__stat-icon" aria-hidden="true">
              👥
            </span>
            <span className="country-details__stat-label">Population</span>
            <strong>{country.population.toLocaleString('en-US')}</strong>
          </article>

          <article className="country-details__stat">
            <span className="country-details__stat-icon" aria-hidden="true">
              ◎
            </span>
            <span className="country-details__stat-label">Region</span>
            <strong>{country.region || 'Not available'}</strong>
          </article>
        </div>
      </section>

      <section className="country-details__section country-details__facts">
        <article className="country-details__fact">
          <span className="country-details__eyebrow">LANGUAGES</span>
          <h2>What people speak</h2>

          {country.languages.length > 0 ? (
            <div className="country-details__tags">
              {country.languages.map((language) => (
                <span className="country-details__tag" key={language}>
                  {language}
                </span>
              ))}
            </div>
          ) : (
            <p className="country-details__empty">No language data available.</p>
          )}
        </article>

        <article className="country-details__fact">
          <span className="country-details__eyebrow">CURRENCY</span>
          <h2>Money matters</h2>

          {country.currencies.length > 0 ? (
            <div className="country-details__tags">
              {country.currencies.map((currency) => (
                <span className="country-details__tag" key={currency}>
                  {currency}
                </span>
              ))}
            </div>
          ) : (
            <p className="country-details__empty">No currency data available.</p>
          )}
        </article>
      </section>

      <section className="country-details__footer">
        <div>
          <h2>Ready to explore?</h2>
          <p>Discover cities and places around the world.</p>
        </div>

        <Link to="/cities" className="country-details__explore">
          Explore cities <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}

export default CountryDetailsPage;
