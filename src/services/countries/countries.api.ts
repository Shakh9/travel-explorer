import { mapCountry } from './countries.mapper';
import type { Country } from '../../types/country';
import type { CountriesApiResponse } from './countries.types';

const API_URL = 'https://api.restcountries.com/countries/v5';

const API_KEY = import.meta.env.VITE_REST_COUNTRIES_API_KEY;

export async function getCountries(): Promise<Country[]> {
  const response = await fetch(
    `${API_URL}?limit=100&response_fields=names.common,names.official,codes.alpha_2,capitals,region,population,languages,currencies,flag.emoji`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();

    console.error('API error status:', response.status);
    console.error('API error body:', errorBody);

    throw new Error(`Failed to fetch countries: ${response.status}`);
  }

  const data = (await response.json()) as CountriesApiResponse;
  console.log('Raw first country:', data.data.objects[0]);
  console.log('Raw flag:', data.data.objects[0]?.flag);

  return data.data.objects.map(mapCountry);
}
