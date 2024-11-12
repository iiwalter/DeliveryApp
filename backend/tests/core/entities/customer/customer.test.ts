import Customer, {
  CustomerProps,
} from '../../../../src/core/entities/customer/customer';
import Address, {
  AddressProps,
} from '../../../../src/core/entities/customer/address/address';
import Name from '../../../../src/core/entities/customer/VOs/name';

describe('Customer', () => {
  const addressProps: AddressProps = {
    street: 'Main St',
    number: 123,
    neighborhood: 'Downtown',
    city: 'Sample City',
    state: 'CA',
    country: 'USA',
    lat: 10,
    long: 20,
  };

  const customerProps: CustomerProps = {
    id: 1,
    name: 'John Doe',
    packageWeight: 2.5,
    address: addressProps,
  };

  const customer = new Customer(customerProps);

  it('should create a Customer instance with the correct properties', () => {
    expect(customer.id).toBe(customerProps.id);
    expect(customer.packageWeight).toBe(customerProps.packageWeight);
    expect(customer.address).toBeInstanceOf(Address);
    expect(customer.name).toBeInstanceOf(Name);
    expect(customer.name.value).toBe(customerProps.name);
  });

  it('should return correct data from getDAO', () => {
    const dao = customer.getDAO();
    expect(dao).toEqual({
      name: customerProps.name,
      packageWeight: customerProps.packageWeight,
    });
  });
});
