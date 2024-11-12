import Address, {
  AddressProps,
} from '../../../../src/core/entities/customer/address/address';
import Errors from '../../../../src/core/constants/errors';

describe('Address', () => {
  const validProps: AddressProps = {
    street: 'Main St',
    number: 123,
    neighborhood: 'Downtown',
    city: 'Sample City',
    state: 'CA',
    country: 'USA',
    lat: 10,
    long: 20,
  };

  it('should create an Address instance with valid props', () => {
    const address = new Address(validProps);

    expect(address.street.value).toBe(validProps.street);
    expect(address.number).toBe(validProps.number);
    expect(address.neighborhood.value).toBe(validProps.neighborhood);
    expect(address.city.value).toBe(validProps.city);
    expect(address.state.value).toBe(validProps.state);
    expect(address.country.value).toBe(validProps.country);
    expect(address.lat).toBe(validProps.lat);
    expect(address.lat).toBe(validProps.lat);
    expect(address.long).toBe(validProps.long);
    expect(address.long).toBe(validProps.long);
  });

  it('should throw an error if props are missing', () => {
    expect(() => new Address()).toThrow(Errors.INVALID_ADDRESS);
  });

  it('should throw an error if any required string field is invalid', () => {
    const invalidStreetProps = { ...validProps, street: '123' };
    expect(() => new Address(invalidStreetProps)).toThrow(
      Errors.INVALID_ADDRESS_STREET,
    );

    const invalidStateProps = { ...validProps, state: '12' };
    expect(() => new Address(invalidStateProps)).toThrow(
      Errors.INVALID_ADDRESS_STATE,
    );

    const invalidCityProps = { ...validProps, city: 'NY' };
    expect(() => new Address(invalidCityProps)).toThrow(
      Errors.INVALID_ADDRESS_CITY,
    );

    const invalidCountryProps = { ...validProps, country: 'UK' };
    expect(() => new Address(invalidCountryProps)).toThrow(
      Errors.INVALID_ADDRESS_COUNTRY,
    );

    const invalidNeighborhoodProps = { ...validProps, neighborhood: '456' };
    expect(() => new Address(invalidNeighborhoodProps)).toThrow(
      Errors.INVALID_ADDRESS_NEIGHBORHOOD,
    );
  });

  it('should return correct data from getDAO', () => {
    const dao = new Address(validProps).getDAO();
    expect(dao).toEqual({
      street: dao.street,
      number: dao.number,
      neighborhood: dao.neighborhood,
      complement: dao.complement,
      city: dao.city,
      state: dao.state,
      country: dao.country,
      lat: dao.lat,
      long: dao.long,
    });
  });
});
