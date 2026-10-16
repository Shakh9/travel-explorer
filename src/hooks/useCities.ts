import { useQuery } from '@tanstack/react-query';

import { getCities } from '../services/cities/citiesService';
import type { City } from '../types/city';

export function useCities() {
  return useQuery<City[], Error>({
    queryKey: ['cities'],
    queryFn: getCities,
    staleTime: 1000 * 60 * 60,
  });
}
