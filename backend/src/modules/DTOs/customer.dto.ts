import { ApiProperty } from '@nestjs/swagger';
import { CustomerProps } from '../../core/entities/customer/customer';
import { AddressDTO } from './address.dto';

export class CustomerDTO implements CustomerProps {
  @ApiProperty()
  name: string;

  @ApiProperty()
  packageWeight: number;

  @ApiProperty({ type: () => AddressDTO })
  address: AddressDTO;
}
