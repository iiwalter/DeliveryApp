import { AddressDTO } from '../DTOs/address.dto';
import Errors from '../../core/constants/errors';
import mapToCustomFormat from './utils/geolocation.functions';

export class GeolocationService {
  constructor() {}

  async fetchGeolocation(inlineAddress: string) {
    return await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(inlineAddress)}&key=${process.env.MAPS}`,
    );
  }

  async getCoordinates(
    inlineAddress: string,
  ): Promise<Partial<AddressDTO> | null> {
    try {
      const response = await this.fetchGeolocation(inlineAddress);

      if (!response.ok) {
        console.log('response.ok');
        throw new Error(`${Errors.INVALID_ADDRESS}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status === 'OK') {
        const result = data.results[0];
        return mapToCustomFormat(result);
      } else {
        throw Error(`${Errors.INVALID_ADDRESS}: 'verify your inline address'`);
      }
    } catch (error) {
      throw new Error(`${error.message ?? error}`);
    }
  }
}
