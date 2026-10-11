import CountryCard from '../components/country/CountryCard';
import { useCountries } from '../hooks/useCountries';
import '../styles/countries.css';

export default function CountriesPage() {
  const { data: countries, isPending, isError, error } = useCountries();

  if (isPending) {
    return (
      <main className="countries-page">
        <p className="countries-page__status" role="status">
          Loading countries...
        </p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="countries-page">
        <p className="countries-page__error" role="alert">
          Failed to load countries: {error.message}
        </p>
      </main>
    );
  }

  if (countries.length === 0) {
    return (
      <main className="countries-page">
        <p className="countries-page__status">No countries found.</p>
      </main>
    );
  }

  return (
    <main className="countries-page">
      <header className="countries-page__header">
        <p className="countries-page__eyebrow">THE WORLD, DISCOVERED</p>
        <h1>Explore countries</h1>
        <p className="countries-page__description">Discover places, cultures and destinations around the world.</p>
        <p className="countries-page__count">{countries.length} countries available</p>
      </header>

      <section className="countries-grid" aria-label="Countries">
        {countries.map((country) => (
          <CountryCard key={country.id} country={country} />
        ))}
      </section>
    </main>
  );
}
