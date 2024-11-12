import Errors from '../../../constants/errors';

export default class Name {
  readonly value: string;

  constructor(value?: string) {
    if (!Name.isValid(value)) throw new Error(Errors.INVALID_NAME);
    this.value = value!.trim();
  }

  static isValid(name?: string): boolean {
    if (!name || name.trim().length < 3) {
      return false;
    }

    return true;
  }
}
