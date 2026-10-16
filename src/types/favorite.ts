import type { Attraction } from './attraction';
import type { City } from './city';
import type { Country } from './country';

export type FavoriteItem =
  | { type: 'country'; item: Country }
  | { type: 'city'; item: City }
  | { type: 'attraction'; item: Attraction };

export function getFavoriteKey(favorite: FavoriteItem): string {
  return `${favorite.type}:${favorite.item.id}`;
}
