import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { GeolocationModule } from './geolocation/geolocation.module';

@Module({
  imports: [CustomerModule, GeolocationModule],
  providers: [],
  exports: [],
})
export class AppModule {}
