import { useState } from 'react';
import CountryCard from '../components/country/CountryCard';
import { useCountries } from '../hooks/useCountries';
import '../styles/countries.css';

type SortOption = 'name-asc' | 'name-desc' | 'population-desc' | 'population-asc';

function getPageNumbers(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages] as const;
  }

  if (currentPage >= totalPages - 3) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages] as const;
}

export default function CountriesPage() {
  const { data: countries, isPending, isError, error } = useCountries();

  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All regions');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

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

  const regions = ['All regions', ...new Set(countries.map((country) => country.region).filter(Boolean))];

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.toLowerCase().includes(search.trim().toLowerCase());

    const matchesRegion = selectedRegion === 'All regions' || country.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    switch (sortBy) {
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'population-desc':
        return b.population - a.population;
      case 'population-asc':
        return a.population - b.population;
      case 'name-asc':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const totalPages = Math.ceil(sortedCountries.length / itemsPerPage);
  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;

  const paginatedCountries = sortedCountries.slice(startIndex, startIndex + itemsPerPage);

  const pageNumbers = getPageNumbers(safeCurrentPage, totalPages);

  const hasActiveFilters = search.trim() !== '' || selectedRegion !== 'All regions' || sortBy !== 'name-asc';

  function resetFilters() {
    setSearch('');
    setSelectedRegion('All regions');
    setSortBy('name-asc');
    setItemsPerPage(12);
    setCurrentPage(1);
  }

  function goToPage(page: number) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }

  return (
    <main className="countries-page">
      <header className="countries-page__header">
        <p className="countries-page__eyebrow">THE WORLD, DISCOVERED</p>
        <h1>Explore countries</h1>
        <p className="countries-page__description">Discover places, cultures and destinations around the world.</p>
        <p className="countries-page__count" aria-live="polite">
          Showing {sortedCountries.length === 0 ? 0 : startIndex + 1}–
          {Math.min(startIndex + itemsPerPage, sortedCountries.length)} of {sortedCountries.length} matching countries
        </p>
      </header>

      <section className="countries-controls" aria-label="Country search and filters">
        <div className="countries-controls__search">
          <label htmlFor="country-search">Search countries</label>
          <input
            id="country-search"
            type="search"
            placeholder="e.g. Canada"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="countries-controls__field">
          <label htmlFor="country-region">Region</label>
          <select
            id="country-region"
            value={selectedRegion}
            onChange={(event) => {
              setSelectedRegion(event.target.value);
              setCurrentPage(1);
            }}
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="countries-controls__field">
          <label htmlFor="country-sort">Sort by</label>
          <select
            id="country-sort"
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value as SortOption);
              setCurrentPage(1);
            }}
          >
            <option value="name-asc">Name: A–Z</option>
            <option value="name-desc">Name: Z–A</option>
            <option value="population-desc">Population: highest first</option>
            <option value="population-asc">Population: lowest first</option>
          </select>
        </div>

        <button
          className="countries-controls__reset"
          type="button"
          onClick={resetFilters}
          disabled={!hasActiveFilters && itemsPerPage === 12}
        >
          Reset
        </button>
      </section>

      {sortedCountries.length > 0 ? (
        <>
          <section className="countries-grid" aria-label="Countries">
            {paginatedCountries.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </section>

          <div className="countries-pagination">
            <label htmlFor="countries-per-page">Countries per page</label>

            <select
              id="countries-per-page"
              value={itemsPerPage}
              onChange={(event) => {
                setItemsPerPage(Number(event.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
            </select>

            <nav className="countries-pagination__nav" aria-label="Pagination">
              <button
                className="countries-pagination__arrow"
                type="button"
                aria-label="Previous page"
                disabled={safeCurrentPage <= 1}
                onClick={() => goToPage(safeCurrentPage - 1)}
              >
                ←
              </button>

              {pageNumbers.map((page, index) =>
                page === '...' ? (
                  <span className="countries-pagination__ellipsis" key={`ellipsis-${index}`} aria-hidden="true">
                    …
                  </span>
                ) : (
                  <button
                    className={`countries-pagination__page${
                      page === safeCurrentPage ? ' countries-pagination__page--active' : ''
                    }`}
                    key={page}
                    type="button"
                    aria-label={`Page ${page}`}
                    aria-current={page === safeCurrentPage ? 'page' : undefined}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                className="countries-pagination__arrow"
                type="button"
                aria-label="Next page"
                disabled={safeCurrentPage >= totalPages}
                onClick={() => goToPage(safeCurrentPage + 1)}
              >
                →
              </button>
            </nav>

            <span className="countries-pagination__info" aria-live="polite">
              Page {safeCurrentPage} of {Math.max(totalPages, 1)}
            </span>
          </div>
        </>
      ) : (
        <p className="countries-page__status" role="status">
          No countries match your search. Try changing your search or filters.
        </p>
      )}
    </main>
  );
}
