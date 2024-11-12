import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { CustomerRepository } from '../../../src/repository/customer/customer.repository';
import { PrismaProvider } from '../../../src/modules/db/prisma.provider';
import Customer from '../../../src/core/entities/customer/customer';

const mockPrismaProvider = {
  customer: {
    create: jest.fn(),
    findMany: jest.fn(),
    deleteMany: jest.fn(),
  },
  address: {
    deleteMany: jest.fn(),
  },
};

describe('CustomerRepository', () => {
  let customerRepository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerRepository,
        {
          provide: PrismaProvider,
          useValue: mockPrismaProvider,
        },
      ],
    }).compile();

    customerRepository = module.get<CustomerRepository>(CustomerRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(customerRepository).toBeDefined();
  });

  it('should create a customer successfully', async () => {
    // arrange
    const customer = new Customer({
      name: 'Paulistano',
      packageWeight: 1,
      address: {
        street: 'Avenida Paulista',
        number: 1230,
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        lat: -23.5639618,
        long: -46.6529048,
      },
    });

    const input: Prisma.CustomerCreateInput = {
      ...customer.getDAO(),
      address: {
        create: {
          ...customer.address.getDAO(),
        },
      },
    };

    mockPrismaProvider.customer.create.mockResolvedValue(undefined);

    // act
    await customerRepository.create(customer);

    // assert
    expect(mockPrismaProvider.customer.create).toHaveBeenCalledWith({
      data: input,
    });
    expect(mockPrismaProvider.customer.create).toHaveBeenCalledTimes(1);
  });

  it('should return all customers', async () => {
    // arrange
    const mockCustomers = [
      {
        id: 1,
        name: 'Paulistano',
        packageWeight: 1,
        address: {
          lat: { toNumber: () => -23.5639618 },
          long: { toNumber: () => -46.6529048 },
          street: 'Avenida Paulista',
          number: 1230,
          neighborhood: 'Bela Vista',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brasil',
        },
      },
    ];

    mockPrismaProvider.customer.findMany.mockResolvedValue(mockCustomers);

    // act
    const result = await customerRepository.getAll();

    // assert
    expect(result).toEqual([
      {
        id: 1,
        name: 'Paulistano',
        packageWeight: 1,
        address: {
          lat: -23.5639618,
          long: -46.6529048,
          street: 'Avenida Paulista',
          number: 1230,
          neighborhood: 'Bela Vista',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brasil',
        },
      },
    ]);

    // assert
    expect(mockPrismaProvider.customer.findMany).toHaveBeenCalledTimes(1);
  });

  it('should remove all customers successfully', async () => {
    // arrange
    mockPrismaProvider.customer.deleteMany.mockResolvedValue(undefined);
    mockPrismaProvider.address.deleteMany.mockResolvedValue(undefined);

    // act
    await customerRepository.removeAll();

    // assert
    expect(mockPrismaProvider.customer.deleteMany).toHaveBeenCalledTimes(1);
    expect(mockPrismaProvider.address.deleteMany).toHaveBeenCalledTimes(1);
  });
});
