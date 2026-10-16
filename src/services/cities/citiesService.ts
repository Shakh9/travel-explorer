import type { City } from '../../types/city';

interface GeoNamesCity {
  geonameId: number;
  name: string;
  countryName: string;
  countryCode: string;
  adminName1?: string;
  population?: number;
  lat: number | string;
  lng: number | string;
}

interface GeoNamesResponse {
  geonames?: GeoNamesCity[];
  status?: {
    message: string;
    value: number;
  };
}

const GEONAMES_USERNAME = import.meta.env.VITE_GEONAMES_USERNAME;

function toNumber(value: number | string | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function getCities(): Promise<City[]> {
  if (!GEONAMES_USERNAME) {
    throw new Error('GeoNames username is missing. Add VITE_GEONAMES_USERNAME to your .env file.');
  }

  const params = new URLSearchParams({
    username: GEONAMES_USERNAME,
    featureClass: 'P',
    style: 'FULL',
    maxRows: '100',
    orderby: 'population',
  });

  const response = await fetch(`https://secure.geonames.org/searchJSON?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to load cities: HTTP ${response.status}`);
  }

  const data = (await response.json()) as GeoNamesResponse;

  if (data.status) {
    throw new Error(`GeoNames API error: ${data.status.message}`);
  }

  if (!data.geonames) {
    throw new Error('GeoNames returned an unexpected response.');
  }

  return data.geonames.map((city) => ({
    id: String(city.geonameId),
    name: city.name,
    countryName: city.countryName,
    countryCode: city.countryCode,
    region: city.adminName1 ?? '',
    population: toNumber(city.population),
    latitude: toNumber(city.lat),
    longitude: toNumber(city.lng),
    imageUrl: null,
    description: null,
  }));
}
