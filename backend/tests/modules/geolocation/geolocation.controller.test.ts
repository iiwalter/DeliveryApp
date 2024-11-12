import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { GeolocationController } from '../../../src/modules/geolocation/geolocation.controller';
import { GeolocationService } from '../../../src/modules/geolocation/geolocation.service';

describe('GeolocationController', () => {
  let geolocationController: GeolocationController;
  let geolocationService: GeolocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeolocationController],
      providers: [
        {
          provide: GeolocationService,
          useValue: {
            getCoordinates: jest.fn(),
          },
        },
      ],
    }).compile();

    geolocationController = module.get<GeolocationController>(
      GeolocationController,
    );
    geolocationService = module.get<GeolocationService>(GeolocationService);
  });

  it('should be defined', () => {
    expect(geolocationController).toBeDefined();
  });

  it('should return coordinates when a valid address is provided', async () => {
    // arrange
    const inlineAddress = 'Avenida Paulista, 1230, São Paulo, SP, Brasil';
    const expectedCoordinates = {
      street: 'Avenida Paulista',
      number: 1230,
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      lat: -23.5639618,
      long: -46.6529048,
    };

    jest
      .spyOn(geolocationService, 'getCoordinates')
      .mockResolvedValue(expectedCoordinates);

    // act
    const result = await geolocationController.createCustomer(inlineAddress);

    // assert
    expect(result).toEqual(expectedCoordinates);
  });

  it('should throw BadRequestException when receives an invalid address', async () => {
    // arrange
    const inlineAddress = 'Invalid Address';

    jest
      .spyOn(geolocationService, 'getCoordinates')
      .mockRejectedValue(new Error('Invalid address'));

    // act + assert
    await expect(
      geolocationController.createCustomer(inlineAddress),
    ).rejects.toThrow(new BadRequestException('Invalid address'));
  });
});
