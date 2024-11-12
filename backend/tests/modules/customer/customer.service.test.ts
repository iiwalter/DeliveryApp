import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../../../src/modules/customer/customer.service';
import { CustomerRepository } from '../../../src/repository/customer/customer.repository';
import { CustomerDTO } from '../../../src/modules/DTOs/customer.dto';
import Customer from '../../../src/core/entities/customer/customer';

const mockCustomerRepository = {
  create: jest.fn(),
  getAll: jest.fn(),
  removeAll: jest.fn(),
};

describe('CustomerService', () => {
  let customerService: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomerRepository,
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(customerService).toBeDefined();
  });

  it('should create a customer successfully', async () => {
    // arrange
    const customerDTO: CustomerDTO = {
      name: 'Korra',
      packageWeight: 1,
      address: {
        street: 'avenida paulista',
        number: 1230,
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        lat: -23.5639618,
        long: -46.6529048,
      },
    };
    mockCustomerRepository.create.mockResolvedValue(undefined);

    // act
    await customerService.createCustomer(customerDTO);

    // assert
    expect(mockCustomerRepository.create).toHaveBeenCalledWith(
      expect.any(Customer),
    );
    expect(mockCustomerRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should return a list of customers', async () => {
    // arrange
    const customers: CustomerDTO[] = [
      {
        name: 'Korra',
        packageWeight: 1,
        address: {
          street: 'avenida paulista',
          number: 1230,
          neighborhood: 'Bela Vista',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brasil',
          lat: -23.5639618,
          long: -46.6529048,
        },
      },
    ];

    mockCustomerRepository.getAll.mockResolvedValue(customers);

    // Act
    const result = await customerService.getCustomers();

    // Assert
    expect(result).toEqual(customers);
    expect(mockCustomerRepository.getAll).toHaveBeenCalledTimes(1);
  });

  it('should delete all customers successfully', async () => {
    // arrange
    mockCustomerRepository.removeAll.mockResolvedValue(undefined);

    // Act
    await customerService.deleteCustomers();

    // Assert
    expect(mockCustomerRepository.removeAll).toHaveBeenCalledTimes(1);
  });
});
