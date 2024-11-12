import { AddressDTO } from '../../DTOs/address.dto';
import { GeocodeResult } from './geolocation.types';

export default function mapToCustomFormat(
  result: GeocodeResult,
): Partial<AddressDTO> {
  return result.address_components.reduce(
    (prev, actual) => {
      const types = actual.types;
      if (types.includes('route')) {
        prev.street = actual.long_name;
      }
      if (types.includes('street_number')) {
        prev.number = parseInt(actual.long_name, 10);
      }
      if (
        types.includes('sublocality') ||
        types.includes('sublocality_level_1')
      ) {
        prev.neighborhood = actual.long_name;
      }
      if (
        types.includes('locality') ||
        types.includes('administrative_area_level_2')
      ) {
        prev.city = actual.long_name;
      }
      if (types.includes('administrative_area_level_1')) {
        prev.state = actual.short_name;
      }
      if (types.includes('country')) {
        prev.country = actual.long_name;
      }
      return prev;
    },
    {
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      country: '',
      lat: result.geometry.location.lat,
      long: result.geometry.location.lng,
    } as Partial<AddressDTO>,
  );
}
