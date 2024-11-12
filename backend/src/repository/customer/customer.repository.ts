import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaProvider } from '../../modules/db/prisma.provider';
import Customer, { CustomerProps } from '../../core/entities/customer/customer';

@Injectable()
export class CustomerRepository {
  constructor(readonly prisma: PrismaProvider) {}

  async create(customer: Customer) {
    const input: Prisma.CustomerCreateInput = {
      ...customer.getDAO(),
      address: {
        create: {
          ...customer.address.getDAO(),
        },
      },
    };

    await this.prisma.customer.create({
      data: input,
    });

    return;
  }

  async getAll() {
    const customers = await this.prisma.customer.findMany({
      include: {
        address: true,
      },
    });

    return customers.map<CustomerProps>((customer) => ({
      ...customer,
      address: {
        ...customer.address,
        lat: customer.address.lat.toNumber(),
        long: customer.address.long.toNumber(),
      },
    }));
  }

  async removeAll() {
    await this.prisma.customer.deleteMany({});

    await this.prisma.address.deleteMany({});
  }
}
