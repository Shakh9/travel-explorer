export interface ApiCountry {
  names?: {
    common?: string;
    official?: string;
  };
  codes?: {
    alpha_2?: string;
  };
  flag?: {
    emoji?: string;
  };
  capitals?: Array<{
    name?: string;
    coordinates?: {
      latitude?: number;
      longitude?: number;
    };
  }>;
  region?: string;
  population?: number;
  languages?: Array<{
    name?: string;
  }>;
  currencies?: Array<{
    name?: string;
    symbol?: string;
  }>;
}

export interface CountriesApiResponse {
  data: {
    objects: ApiCountry[];
  };
}
