export interface GeocodeComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface GeocodeResult {
  address_components: GeocodeComponent[];
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export interface GeocodeResponse {
  results: GeocodeResult[];
  status: string;
}
