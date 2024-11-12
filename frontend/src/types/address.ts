export interface BaseAddress {
  street: string;
  number: number;
  neighborhood: string;
  complement?: string;
  city: string;
  state: string;
  country: string;
}

export interface Geolocation {
  lat: number;
  long: number;
}

export interface Address extends BaseAddress, Geolocation {}
