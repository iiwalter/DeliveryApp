import Name from '../../../../src/core/entities/customer/VOs/name';
import Errors from '../../../../src/core/constants/errors';

test('should create a valid name', () => {
  // arrange + act
  const name = new Name('bob marley');

  // assert
  expect(name.value).toEqual('bob marley');
});

test('should throw an error when creates a invalid name (based on length of two words)', () => {
  expect(() => new Name('bc')).toThrow(Errors.INVALID_NAME);
});

test('should throw an error when name is empty', () => {
  expect(() => new Name('')).toThrow(Errors.INVALID_NAME);
});
