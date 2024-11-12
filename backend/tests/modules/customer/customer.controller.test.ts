import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CustomerService } from '../../../src/modules/customer/customer.service';
import { CustomerDTO } from '../../../src/modules/DTOs/customer.dto';
import { CustomerController } from '../../../src/modules/customer/customer.controller';

const mockCustomerService = {
  getCustomers: jest.fn(),
  createCustomer: jest.fn(),
  deleteCustomers: jest.fn(),
};

describe('CustomerController', () => {
  let customerController: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: mockCustomerService,
        },
      ],
    }).compile();

    customerController = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(customerController).toBeDefined();
  });

  describe('getCustomers', () => {
    it('should return a list of customers', async () => {
      // arrange
      const result = [{ id: 1, name: 'Korra', packageWeight: 1 }];
      mockCustomerService.getCustomers.mockResolvedValue(result);

      // act
      const customers = await customerController.getCustomers();

      // assert
      expect(customers).toEqual(result);
      expect(mockCustomerService.getCustomers).toHaveBeenCalledTimes(1);
    });

    it('should throw a BadRequestException on error', async () => {
      // arrange
      mockCustomerService.getCustomers.mockRejectedValue(
        new Error('Error fetching customers'),
      );

      try {
        // act
        await customerController.getCustomers();
      } catch (error) {
        // assert
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toStrictEqual('Error: Error fetching customers');
      }
    });
  });

  describe('createCustomer', () => {
    it('should create a customer successfully', async () => {
      // arrange
      const customerDTO: CustomerDTO = {
        name: 'Walter',
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
      };

      mockCustomerService.createCustomer.mockResolvedValue(undefined);

      // act
      await customerController.createCustomer(customerDTO);

      // assert
      expect(mockCustomerService.createCustomer).toHaveBeenCalledWith(
        customerDTO,
      );
      expect(mockCustomerService.createCustomer).toHaveBeenCalledTimes(1);
    });

    it('should throw a BadRequestException on error', async () => {
      // arrange
      const customerDTO: CustomerDTO = {
        name: 'Walter',
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
      };

      mockCustomerService.createCustomer.mockRejectedValue(
        new Error('Error creating customer'),
      );

      try {
        // act
        await customerController.createCustomer(customerDTO);
      } catch (error) {
        // assert
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toStrictEqual('Error creating customer');
      }
    });
  });

  describe('deleteCustomers', () => {
    it('should delete customers successfully', async () => {
      // arrange
      mockCustomerService.deleteCustomers.mockResolvedValue(undefined);

      // act
      await customerController.deleteCustomers();

      // assert
      expect(mockCustomerService.deleteCustomers).toHaveBeenCalledTimes(1);
    });
  });
});
