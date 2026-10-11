import { useQuery } from '@tanstack/react-query';
import { getCountries } from '../services/countries/countries.api';

export function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
    staleTime: 5 * 60 * 1000,
  });
}
