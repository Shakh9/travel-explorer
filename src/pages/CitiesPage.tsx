import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import FavoriteButton from '../components/favorites/FavoriteButton';
import { useCities } from '../hooks/useCities';
import '../styles/cities.css';

type SortOption = 'name-asc' | 'name-desc' | 'population-desc' | 'population-asc';

const PAGE_SIZE_OPTIONS = [12, 24, 48];

function formatPopulation(population: number): string {
  return new Intl.NumberFormat('en-US').format(population);
}

function CitiesPage() {
  const { data: cities = [], isLoading, isError, error, refetch } = useCities();

  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('population-desc');
  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const countries = useMemo(
    () => [...new Set(cities.map((city) => city.countryName))].sort((a, b) => a.localeCompare(b)),
    [cities],
  );

  const filteredCities = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return cities
      .filter((city) => {
        const matchesSearch =
          normalizedSearch.length === 0 ||
          city.name.toLowerCase().includes(normalizedSearch) ||
          city.countryName.toLowerCase().includes(normalizedSearch) ||
          city.region.toLowerCase().includes(normalizedSearch);

        const matchesCountry = selectedCountry === 'all' || city.countryName === selectedCountry;

        return matchesSearch && matchesCountry;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'population-asc':
            return a.population - b.population;
          case 'population-desc':
          default:
            return b.population - a.population;
        }
      });
  }, [cities, search, selectedCountry, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredCities.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const visibleCities = filteredCities.slice(startIndex, startIndex + pageSize);

  function resetFilters() {
    setSearch('');
    setSelectedCountry('all');
    setSortBy('population-desc');
    setPageSize(12);
    setCurrentPage(1);
  }

  function changeSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function changeCountry(value: string) {
    setSelectedCountry(value);
    setCurrentPage(1);
  }

  function changeSort(value: SortOption) {
    setSortBy(value);
    setCurrentPage(1);
  }

  function changePageSize(value: number) {
    setPageSize(value);
    setCurrentPage(1);
  }

  return (
    <main className="cities-page">
      <section className="cities-hero">
        <div className="cities-hero__content">
          <span className="cities-eyebrow">EXPLORE THE WORLD</span>
          <h1>Discover amazing cities.</h1>
          <p>From iconic capitals to vibrant urban destinations, find your next place to explore.</p>
        </div>

        <div className="cities-hero__decoration" aria-hidden="true">
          <span className="cities-hero__orb cities-hero__orb--one" />
          <span className="cities-hero__orb cities-hero__orb--two" />
          <span className="cities-hero__orb cities-hero__orb--three" />
        </div>
      </section>

      <section className="cities-catalog" aria-labelledby="cities-heading">
        <div className="cities-section-heading">
          <div>
            <span className="cities-eyebrow">THE CITY COLLECTION</span>
            <h2 id="cities-heading">Cities around the world</h2>
          </div>

          {!isLoading && !isError && (
            <span className="cities-count">
              {filteredCities.length} {filteredCities.length === 1 ? 'city' : 'cities'}
            </span>
          )}
        </div>

        <div className="cities-filters">
          <label className="cities-search">
            <span className="cities-control-label">Search</span>
            <input
              type="search"
              value={search}
              onChange={(event) => changeSearch(event.target.value)}
              placeholder="Search cities, countries..."
              aria-label="Search cities, countries, or regions"
            />
          </label>

          <label className="cities-filter-control">
            <span className="cities-control-label">Country</span>
            <select value={selectedCountry} onChange={(event) => changeCountry(event.target.value)}>
              <option value="all">All countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>

          <label className="cities-filter-control">
            <span className="cities-control-label">Sort by</span>
            <select value={sortBy} onChange={(event) => changeSort(event.target.value as SortOption)}>
              <option value="population-desc">Largest population</option>
              <option value="population-asc">Smallest population</option>
              <option value="name-asc">Name: A–Z</option>
              <option value="name-desc">Name: Z–A</option>
            </select>
          </label>

          <button className="cities-reset-button" type="button" onClick={resetFilters}>
            Reset
          </button>
        </div>

        {isLoading && (
          <div className="cities-message" role="status">
            <span className="cities-spinner" />
            <h3>Finding your next destination...</h3>
            <p>Loading cities from around the world.</p>
          </div>
        )}

        {isError && (
          <div className="cities-message cities-message--error" role="alert">
            <h3>We couldn’t load the cities.</h3>
            <p>{error.message}</p>
            <button className="cities-primary-button" type="button" onClick={() => void refetch()}>
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && filteredCities.length === 0 && (
          <div className="cities-message">
            <h3>No cities found</h3>
            <p>Try another search or reset your filters.</p>
            <button className="cities-primary-button" type="button" onClick={resetFilters}>
              Clear filters
            </button>
          </div>
        )}

        {!isLoading && !isError && filteredCities.length > 0 && (
          <>
            <div className="cities-grid">
              {visibleCities.map((city) => (
                <article className="city-card" key={city.id}>
                  <div className="city-card__visual" aria-hidden="true">
                    <span className="city-card__visual-mark">{city.countryCode.toUpperCase()}</span>
                    <span className="city-card__coordinates">
                      {Number.isFinite(Number(city.latitude)) && Number.isFinite(Number(city.longitude))
                        ? `${Number(city.latitude).toFixed(2)}°, ${Number(city.longitude).toFixed(2)}°`
                        : 'Coordinates unavailable'}
                    </span>
                  </div>

                  <div className="city-card__body">
                    <span className="city-card__country">{city.countryName}</span>
                    <h3>{city.name}</h3>

                    {city.region && <p className="city-card__region">{city.region}</p>}

                    <div className="city-card__footer">
                      <div>
                        <span className="city-card__meta-label">Population</span>
                        <strong>{formatPopulation(city.population)}</strong>
                      </div>

                      <Link className="city-card__link" to={`/cities/${city.id}`} aria-label={`Explore ${city.name}`}>
                        Explore <span aria-hidden="true">↗</span>
                      </Link>
                    </div>

                    <div className="city-card__favorite">
                      <FavoriteButton favorite={{ type: 'city', item: city }} />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cities-pagination">
              <label className="cities-page-size">
                <span>Show</span>
                <select
                  value={pageSize}
                  onChange={(event) => changePageSize(Number(event.target.value))}
                  aria-label="Cities per page"
                >
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <span>per page</span>
              </label>

              <span className="cities-pagination__summary">
                Showing {startIndex + 1}–{Math.min(startIndex + pageSize, filteredCities.length)} of{' '}
                {filteredCities.length}
              </span>

              <div className="cities-pagination__actions">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={safeCurrentPage === 1}
                  aria-label="Previous page"
                >
                  ←
                </button>

                <span>
                  {safeCurrentPage} / {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={safeCurrentPage === totalPages}
                  aria-label="Next page"
                >
                  →
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default CitiesPage;
