import { Link } from 'react-router-dom';
import type { Country } from '../../types/country';

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <article className="country-card">
      <div className="country-card__flag" aria-hidden="true">
        {country.flag}
      </div>

      <div className="country-card__content">
        <h2 className="country-card__title">{country.name}</h2>
        <p className="country-card__official-name">{country.officialName}</p>

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

        <Link className="country-card__link" to={`/countries/${country.id}`}>
          Explore country
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </article>
  );
}
