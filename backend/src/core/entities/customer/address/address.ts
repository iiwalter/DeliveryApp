import Errors from '../../../constants/errors';
import { AddressField } from './addressField';

export interface AddressProps {
  street: string;
  number: number;
  neighborhood: string;
  complement?: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  long: number;
}

export default class Address {
  street: AddressField;
  state: AddressField;
  city: AddressField;
  country: AddressField;
  number: number;
  neighborhood: AddressField;
  complement?: string;
  lat: number;
  long: number;

  constructor(props?: AddressProps) {
    if (!props) {
      throw new Error(Errors.INVALID_ADDRESS);
    }
    this.number = props.number;
    this.complement = props.complement;
    this.street = new AddressField(props.street, Errors.INVALID_ADDRESS_STREET);
    this.state = new AddressField(props.state, Errors.INVALID_ADDRESS_STATE, 2);
    this.city = new AddressField(props.city, Errors.INVALID_ADDRESS_CITY, 4);
    this.country = new AddressField(
      props.country,
      Errors.INVALID_ADDRESS_COUNTRY,
      3,
    );
    this.neighborhood = new AddressField(
      props.neighborhood,
      Errors.INVALID_ADDRESS_NEIGHBORHOOD,
    );
    this.lat = props.lat;
    this.long = props.long;
  }

  getDAO() {
    return {
      street: this.street.value,
      number: this.number,
      neighborhood: this.neighborhood.value,
      complement: this.complement,
      city: this.city.value,
      state: this.state.value,
      country: this.country.value,
      lat: this.lat,
      long: this.long,
    };
  }
}
