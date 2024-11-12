import Errors from '../../../constants/errors';

export class AddressField {
  readonly value: string;

  constructor(
    value?: string,
    errorMessage: string = Errors.INVALID_ADDRESS_FIELD,
    minimumLength?: number,
  ) {
    if (!AddressField.isValid(value, minimumLength))
      throw new Error(errorMessage);
    this.value = value!;
  }

  static isValid(field?: string, minimumLength?: number): boolean {
    if (!field) return false;

    const trimmedField = field.trim();
    const hasOnlyNumbers = /^\d+$/.test(trimmedField);
    if (hasOnlyNumbers) return false;

    const letterCount = (trimmedField.match(/[a-zA-Z]/g) || []).length;
    return letterCount >= (minimumLength ?? 4);
  }
}
