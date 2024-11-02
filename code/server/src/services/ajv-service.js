import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export class AjvService {
  constructor() {
    this.ajv = new Ajv();
    addFormats(this.ajv);
  }

  validate(data, schema) {
    const validate = this.ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      console.error('Validation errors:', validate.errors);
      throw new Error('Invalid request body.');
    }
    return true;
  }

  validateWithoutThrow(data, schema) {
    const validate = this.ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      return false;
    }
    return true;
  }
}
