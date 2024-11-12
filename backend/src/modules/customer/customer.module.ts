import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { DbModule } from '../db/db.module';
import { CustomerRepository } from '../../repository/customer/customer.repository';

@Module({
  imports: [DbModule],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
