import type { Attraction } from '../../types/attraction';

interface WikipediaPage {
  pageid: number;
  title: string;
  extract?: string;
  fullurl?: string;
  thumbnail?: {
    source: string;
  };
}

interface WikipediaResponse {
  query?: {
    pages?: Record<string, WikipediaPage>;
  };
}

const WIKIPEDIA_API = 'https://en.wikipedia.org/w/api.php';

export async function getAttractions(searchTerm: string): Promise<Attraction[]> {
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: searchTerm.trim() || 'famous tourist attractions landmarks',
    gsrnamespace: '0',
    gsrlimit: '30',
    prop: 'pageimages|extracts|info',
    piprop: 'thumbnail',
    pithumbsize: '640',
    exintro: '1',
    explaintext: '1',
    inprop: 'url',
    format: 'json',
    origin: '*',
  });

  const response = await fetch(`${WIKIPEDIA_API}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to load attractions: HTTP ${response.status}`);
  }

  const data = (await response.json()) as WikipediaResponse;
  const pages = Object.values(data.query?.pages ?? {});

  return pages
    .filter((page) => Boolean(page.title))
    .map((page) => ({
      id: String(page.pageid),
      title: page.title,
      description: page.extract?.trim() ?? '',
      imageUrl: page.thumbnail?.source ?? null,
      pageUrl: page.fullurl ?? `https://en.wikipedia.org/?curid=${page.pageid}`,
    }));
}
