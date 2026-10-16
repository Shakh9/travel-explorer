import { Link } from 'react-router-dom';

import FavoriteButton from '../favorites/FavoriteButton';
import type { Country } from '../../types/country';

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <article className="country-card">
      <div className="country-card__main">
        <div className="country-card__sidebar">
          <div className="country-card__flag">
            <img src={country.flagUrl} alt={`Flag of ${country.name}`} loading="lazy" />
          </div>

          <dl className="country-card__details">
            <div>
              <dt>Capital</dt>
              <dd>{country.capital ?? 'Unknown'}</dd>
            </div>

            <div>
              <dt>Region</dt>
              <dd>{country.region}</dd>
            </div>

            <div>
              <dt>Population</dt>
              <dd>{country.population.toLocaleString('en-US')}</dd>
            </div>
          </dl>
        </div>

        <div className="country-card__content">
          <h2 className="country-card__title">{country.name}</h2>
          <p className="country-card__official-name">{country.officialName}</p>
        </div>
      </div>

      <div className="country-card__actions">
        <Link className="country-card__link" to={`/countries/${country.id}`}>
          Explore country
        </Link>

        <FavoriteButton favorite={{ type: 'country', item: country }} />
      </div>
    </article>
  );
}
