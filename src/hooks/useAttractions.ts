import { useQuery } from '@tanstack/react-query';

import { getAttractions } from '../services/attractions/attractionsService';
import type { Attraction } from '../types/attraction';

export function useAttractions(searchTerm: string) {
  return useQuery<Attraction[], Error>({
    queryKey: ['attractions', searchTerm],
    queryFn: () => getAttractions(searchTerm),
    staleTime: 1000 * 60 * 30,
  });
}
