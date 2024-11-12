import Errors from '../../../../src/core/constants/errors';
import { AddressField } from '../../../../src/core/entities/customer/address/addressField';

describe('AddressField', () => {
  describe('isValid', () => {
    it('should return false for a field with only numbers', () => {
      expect(AddressField.isValid('123456')).toBe(false);
    });

    it('should return false for an empty string', () => {
      expect(AddressField.isValid()).toBe(false);
    });

    it('should return true for a field with letters equal to or greater than the minimum length', () => {
      expect(AddressField.isValid('abcd', 4)).toBe(true);
      expect(AddressField.isValid('abcde', 4)).toBe(true);
    });

    it('should return false for a field with letters fewer than the minimum length', () => {
      expect(AddressField.isValid('abc', 4)).toBe(false);
    });

    it('should return true for a field with letters and spaces meeting the minimum length', () => {
      expect(AddressField.isValid(' ab cd ', 4)).toBe(true);
    });

    it('should return false for a field with letters fewer than the minimum length after trimming spaces', () => {
      expect(AddressField.isValid(' ab ', 4)).toBe(false);
    });

    it('should handle cases where no minimum length is provided (default to 4)', () => {
      expect(AddressField.isValid('abcd')).toBe(true);
      expect(AddressField.isValid('abc')).toBe(false);
    });
  });

  describe('constructor', () => {
    it('should throw an error if the field is invalid', () => {
      expect(() => new AddressField('123456')).toThrow(
        Errors.INVALID_ADDRESS_FIELD,
      );
    });

    it('should not throw an error if the field is valid', () => {
      expect(() => new AddressField('abcd')).not.toThrow();
    });
  });
});
