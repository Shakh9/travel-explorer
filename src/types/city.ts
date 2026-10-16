export interface City {
  id: string;
  name: string;
  countryName: string;
  countryCode: string;
  region: string;
  population: number;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
  description: string | null;
}
