import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
} from '@nestjs/common';
import { CustomerProps } from '../../core/entities/customer/customer';
import { CustomerService } from './customer.service';
import { ApiBody } from '@nestjs/swagger';
import { CustomerDTO } from '../DTOs/customer.dto';

@Controller('/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getCustomers(): Promise<CustomerProps[]> {
    try {
      return await this.customerService.getCustomers();
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  @Delete()
  @HttpCode(204)
  async deleteCustomers() {
    try {
      return this.customerService.deleteCustomers();
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  @Post()
  @ApiBody({ type: CustomerDTO })
  async createCustomer(@Body() customer: CustomerDTO) {
    try {
      return await this.customerService.createCustomer(customer);
    } catch (error) {
      const message = error?.message ?? `${error}`;
      throw new BadRequestException(message);
    }
  }
}
