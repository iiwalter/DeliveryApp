import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';

@Controller('/geolocation')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  @Get('/:inlineAddress')
  async createCustomer(@Param('inlineAddress') inlineAddress: string) {
    try {
      return await this.geolocationService.getCoordinates(inlineAddress);
    } catch (error) {
      throw new BadRequestException(error?.message ?? `${error}`);
    }
  }
}
