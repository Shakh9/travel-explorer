import { Link, useParams } from 'react-router-dom';

import { useAttractionDetails } from '../hooks/useAttractionDetails';
import '../styles/attraction-details.css';

function AttractionDetailsPage() {
  const { attractionId } = useParams();
  const { data, isPending, isError, error } = useAttractionDetails(attractionId);

  if (isPending) {
    return (
      <main className="attraction-details page-container">
        <p className="attraction-details__status">Loading attraction details...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="attraction-details page-container">
        <div className="attraction-details__message">
          <h1>Something went wrong</h1>
          <p>{error.message}</p>
          <Link to="/attractions" className="attraction-details__back">
            Back to attractions
          </Link>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="attraction-details page-container">
        <div className="attraction-details__message">
          <h1>Attraction not found</h1>
          <p>This attraction may no longer be available in Wikipedia.</p>
          <Link to="/attractions" className="attraction-details__back">
            Back to attractions
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="attraction-details page-container">
      <Link to="/attractions" className="attraction-details__back">
        <span aria-hidden="true">←</span> All attractions
      </Link>

      <article className="attraction-details__content">
        <div className="attraction-details__hero">
          {data.imageUrl ? (
            <img className="attraction-details__image" src={data.imageUrl} alt={data.title} />
          ) : (
            <div className="attraction-details__image-placeholder" role="img" aria-label="No image available">
              <span aria-hidden="true">✦</span>
            </div>
          )}

          <div className="attraction-details__image-overlay" />

          <div className="attraction-details__title">
            <span className="attraction-details__eyebrow">TRAVEL EXPLORER · LANDMARK</span>
            <h1>{data.title}</h1>
          </div>
        </div>

        <section className="attraction-details__description">
          <span className="attraction-details__section-label">DISCOVER</span>
          <h2>About this place</h2>

          {data.description ? (
            <p>{data.description}</p>
          ) : (
            <p>A detailed description is not currently available. Visit Wikipedia to learn more about this place.</p>
          )}

          <a className="attraction-details__source" href={data.pageUrl} target="_blank" rel="noreferrer">
            Read more on Wikipedia <span aria-hidden="true">↗</span>
          </a>
        </section>
      </article>
    </main>
  );
}

export default AttractionDetailsPage;
