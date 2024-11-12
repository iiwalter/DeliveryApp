import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../repository/customer/customer.repository';
import Customer from '../../core/entities/customer/customer';
import { CustomerDTO } from '../DTOs/customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly repository: CustomerRepository) {}

  async createCustomer(customer: CustomerDTO): Promise<void> {
    const validatedCustomer = new Customer(customer);
    await this.repository.create(validatedCustomer);
    return;
  }

  async getCustomers(): Promise<CustomerDTO[]> {
    const customersWithProps = await this.repository.getAll();
    return customersWithProps;
  }

  async deleteCustomers(): Promise<void> {
    await this.repository.removeAll();
    return;
  }
}
