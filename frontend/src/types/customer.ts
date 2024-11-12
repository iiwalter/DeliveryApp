import { Address } from "./address";

export interface Customer {
  id?: number;
  name: string;
  packageWeight: number;
  address: Address;
}
