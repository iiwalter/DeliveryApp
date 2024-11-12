import { ApiProperty } from '@nestjs/swagger';
import { AddressProps } from '../../core/entities/customer/address/address';

export class GeolocationDTO {
  @ApiProperty()
  lat: number;

  @ApiProperty()
  long: number;
}

export class CreateAddressDTO {
  @ApiProperty()
  street: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty({ nullable: true })
  complement?: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  long: number;
}

export class AddressDTO extends CreateAddressDTO implements AddressProps {
  @ApiProperty()
  lat: number;

  @ApiProperty()
  long: number;
}
