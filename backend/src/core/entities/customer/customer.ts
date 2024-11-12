import Address, { AddressProps } from './address/address';
import Name from './VOs/name';

export interface CustomerProps {
  id?: number;
  name: string;
  packageWeight: number;
  address: AddressProps;
}

export default class Customer {
  id?: number;
  name: Name;
  packageWeight: number;
  address: Address;

  constructor(props: CustomerProps) {
    this.id = props.id;
    this.address = new Address(props.address);
    this.name = new Name(props.name);
    this.packageWeight = props.packageWeight;
  }

  getDAO() {
    return {
      name: this.name.value,
      packageWeight: this.packageWeight,
    };
  }
}
