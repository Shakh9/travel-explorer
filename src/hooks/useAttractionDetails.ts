import { useQuery } from '@tanstack/react-query';

import { getAttractionById } from '../services/attractions/attractionsService';
import type { Attraction } from '../types/attraction';

export function useAttractionDetails(attractionId: string | undefined) {
  return useQuery<Attraction | null, Error>({
    queryKey: ['attraction', attractionId],
    queryFn: () => getAttractionById(attractionId!),
    enabled: Boolean(attractionId),
    staleTime: 1000 * 60 * 30,
  });
}
