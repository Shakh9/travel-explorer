import type { Country } from '../../types/country';
import type { ApiCountry } from './countries.types';

export function mapCountry(country: ApiCountry): Country {
  return {
    id: country.codes?.alpha_2 ?? '',
    name: country.names?.common ?? 'Unknown country',
    officialName: country.names?.official ?? 'Unknown',
    flag: country.flag?.emoji || '🌍',
    capital: country.capitals?.[0]?.name ?? null,
    region: country.region ?? 'Unknown',
    population: country.population ?? 0,
    languages: country.languages?.map((language) => language.name ?? 'Unknown') ?? [],
    currencies: country.currencies?.map((currency) => currency.name ?? 'Unknown') ?? [],
  };
}
