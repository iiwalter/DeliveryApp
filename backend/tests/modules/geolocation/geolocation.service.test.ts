import { GeolocationService } from '../../../src/modules/geolocation/geolocation.service';
import { AddressDTO } from '../../../src/modules/DTOs/address.dto';
import Errors from '../../../src/core/constants/errors';
import { GeocodeResponse } from './../../../src/modules/geolocation/utils/geolocation.types';

describe('GeolocationService', () => {
  let geolocationService: GeolocationService;

  beforeEach(() => {
    geolocationService = new GeolocationService();
  });

  it('should return coordinates when the address is valid', async () => {
    // arrange
    const mockResponse: GeocodeResponse = {
      status: 'OK',
      results: [
        {
          address_components: [
            {
              long_name: 'Avenida Paulista',
              types: ['route'],
              short_name: '',
            },
            {
              long_name: '1230',
              types: ['street_number'],
              short_name: '',
            },
            {
              long_name: 'Bela Vista',
              types: ['sublocality'],
              short_name: '',
            },
            {
              long_name: 'São Paulo',
              types: ['locality'],
              short_name: '',
            },
            {
              long_name: 'SP',
              types: ['administrative_area_level_1'],
              short_name: 'SP',
            },
            {
              long_name: 'Brasil',
              types: ['country'],
              short_name: '',
            },
          ],
          geometry: {
            location: {
              lat: -23.5639618,
              lng: -46.6529048,
            },
          },
          formatted_address: '',
        },
      ],
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    } as any);

    const inlineAddress = 'Avenida Paulista, 1230, São Paulo, SP, Brasil';
    const expectedAddress: Partial<AddressDTO> = {
      street: 'Avenida Paulista',
      number: 1230,
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      lat: -23.5639618,
      long: -46.6529048,
    };

    // act
    const result = await geolocationService.getCoordinates(inlineAddress);

    // assert
    expect(result).toEqual(expectedAddress);

    jest.restoreAllMocks();
  });

  it('should throw an error when the address is invalid', async () => {
    // arrange
    const mockResponse = {
      status: 'ZERO_RESULTS',
      results: [],
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    } as any);

    const inlineAddress = 'Invalid Address';

    // act + assert
    await expect(
      geolocationService.getCoordinates(inlineAddress),
    ).rejects.toThrow(
      `${Errors.INVALID_ADDRESS}: 'verify your inline address'`,
    );

    jest.restoreAllMocks();
  });

  it('should throw an error when fetch fails', async () => {
    // arrange
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network Error'));
    const inlineAddress = 'Avenida Paulista, 1230, São Paulo, SP, Brasil';

    // act + assert
    await expect(
      geolocationService.getCoordinates(inlineAddress),
    ).rejects.toThrow('Network Error');

    jest.restoreAllMocks();
  });
});
