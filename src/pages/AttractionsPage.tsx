import { useRef, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import FavoriteButton from '../components/favorites/FavoriteButton';
import { useAttractions } from '../hooks/useAttractions';
import '../styles/attractions.css';

const DEFAULT_SEARCH = 'famous tourist attractions landmarks around the world';

function AttractionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const urlSearch = searchParams.get('search')?.trim() ?? '';
  const submittedSearch = urlSearch || DEFAULT_SEARCH;

  const { data: attractions = [], isLoading, isError, error, refetch } = useAttractions(submittedSearch);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchInputRef.current?.value.trim() ?? '';

    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  }

  return (
    <main className="attractions-page">
      <section className="attractions-hero">
        <div className="attractions-hero__content">
          <span className="attractions-eyebrow">PLACES WORTH DISCOVERING</span>
          <h1>Discover the extraordinary.</h1>
          <p>Explore famous landmarks, remarkable places and destinations through articles from Wikipedia.</p>

          <form className="attractions-search" onSubmit={handleSearch}>
            <label className="attractions-search__label" htmlFor="attraction-search">
              Search destinations
            </label>

            <div className="attractions-search__controls">
              <input
                key={urlSearch}
                ref={searchInputRef}
                id="attraction-search"
                type="search"
                defaultValue={urlSearch}
                placeholder="Try Eiffel Tower or ancient temples"
              />
              <button type="submit">Search</button>
            </div>
          </form>
        </div>

        <div className="attractions-hero__art" aria-hidden="true">
          <span className="attractions-hero__ring attractions-hero__ring--one" />
          <span className="attractions-hero__ring attractions-hero__ring--two" />
          <span className="attractions-hero__star">✦</span>
        </div>
      </section>

      <section className="attractions-results" aria-labelledby="attractions-heading">
        <div className="attractions-results__heading">
          <div>
            <span className="attractions-eyebrow">THE WORLD COLLECTION</span>
            <h2 id="attractions-heading">Places to explore</h2>
          </div>

          {!isLoading && !isError && <span className="attractions-count">{attractions.length} results</span>}
        </div>

        {isLoading && (
          <div className="attractions-message" role="status">
            <span className="attractions-spinner" />
            <h3>Discovering remarkable places...</h3>
            <p>Loading articles and available images.</p>
          </div>
        )}

        {isError && (
          <div className="attractions-message" role="alert">
            <h3>We couldn’t load the results.</h3>
            <p>{error.message}</p>
            <button className="attractions-button" type="button" onClick={() => void refetch()}>
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && attractions.length === 0 && (
          <div className="attractions-message">
            <h3>No articles found</h3>
            <p>Try a different search term.</p>
          </div>
        )}

        {!isLoading && !isError && attractions.length > 0 && (
          <div className="attractions-grid">
            {attractions.map((attraction) => (
              <article className="attraction-card" key={attraction.id}>
                {attraction.imageUrl ? (
                  <img className="attraction-card__image" src={attraction.imageUrl} alt="" loading="lazy" />
                ) : (
                  <div className="attraction-card__placeholder" aria-hidden="true">
                    <span>✦</span>
                    <span>TRAVEL EXPLORER</span>
                  </div>
                )}

                <div className="attraction-card__body">
                  <span className="attraction-card__eyebrow">DESTINATION SPOTLIGHT</span>
                  <h3>{attraction.title}</h3>
                  <p>{attraction.description || 'Read more about this place and discover its story.'}</p>

                  <div className="attraction-card__actions">
                    <Link className="attraction-card__link" to={`/attractions/${attraction.id}`}>
                      Explore <span aria-hidden="true">↗</span>
                    </Link>
                    <a className="attraction-card__source" href={attraction.pageUrl} target="_blank" rel="noreferrer">
                      Wikipedia
                    </a>
                  </div>

                  <div className="attraction-card__favorite">
                    <FavoriteButton favorite={{ type: 'attraction', item: attraction }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="attractions-attribution">
          Article summaries and images are provided by Wikipedia. Search results may include general articles, not only
          tourist attractions.
        </p>
      </section>
    </main>
  );
}

export default AttractionsPage;
