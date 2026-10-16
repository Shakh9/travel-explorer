import type { Country } from '../../types/country';
import type { ApiCountry } from './countries.types';

function getFlagEmoji(countryCode?: string): string {
  if (!countryCode || !/^[A-Z]{2}$/i.test(countryCode)) {
    return '🌍';
  }

  return String.fromCodePoint(
    ...countryCode
      .toUpperCase()
      .split('')
      .map((letter) => 127397 + letter.charCodeAt(0)),
  );
}

export function mapCountry(country: ApiCountry): Country {
  return {
    id: country.codes?.alpha_2 ?? '',
    name: country.names?.common ?? 'Unknown country',
    officialName: country.names?.official ?? 'Unknown',
    flag: country.flag?.emoji || getFlagEmoji(country.codes?.alpha_2),
    flagUrl: `https://flagcdn.com/w160/${country.codes?.alpha_2?.toLowerCase()}.png`,
    capital: country.capitals?.[0]?.name ?? null,
    region: country.region ?? 'Unknown',
    population: country.population ?? 0,
    languages: country.languages?.map((language) => language.name ?? 'Unknown') ?? [],
    currencies: country.currencies?.map((currency) => currency.name ?? 'Unknown') ?? [],
  };
}
