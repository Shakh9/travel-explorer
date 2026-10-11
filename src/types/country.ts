export interface Country {
  id: string;
  name: string;
  officialName: string;
  flag: string;
  capital: string | null;
  region: string;
  population: number;
  languages: string[];
  currencies: string[];
}
