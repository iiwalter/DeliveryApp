import mapToCustomFormat from '../../../../src/modules/geolocation/utils/geolocation.functions';
import { GeocodeResult } from '../../../../src/modules/geolocation/utils/geolocation.types';
import { AddressDTO } from '../../../../src/modules/DTOs/address.dto';

describe('mapToCustomFormat', () => {
  it('should correctly map a the GeocodeResult to AddressDTO format', () => {
    // Arrange
    const mockGeocodeResult: GeocodeResult = {
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
          long_name: 'São Paulo',
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
      formatted_address:
        'Avenida Paulista, 1230, Bela Vista - São Paulo SP, Brasil ',
    };
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

    // Act
    const result = mapToCustomFormat(mockGeocodeResult);

    // Assert
    expect(result).toEqual(expectedAddress);
  });

  it('should return an empty address when the GeocodeResult has no information', () => {
    // Arrange
    const mockGeocodeResult: GeocodeResult = {
      address_components: [],
      geometry: {
        location: {
          lat: 0,
          lng: 0,
        },
      },
      formatted_address: '',
    };
    const expectedAddress: Partial<AddressDTO> = {
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      country: '',
      lat: 0,
      long: 0,
    };

    // Act
    const result = mapToCustomFormat(mockGeocodeResult);

    // Assert
    expect(result).toEqual(expectedAddress);
  });
});
