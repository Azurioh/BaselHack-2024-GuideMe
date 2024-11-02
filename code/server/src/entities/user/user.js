export const createUserSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['firstName', 'lastName', 'email', 'password'],
  additionalProperties: false,
};

export const updateUserSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
  },
  anyOf: [{ required: ['firstName'] }, { required: ['lastName'] }],
  additionalProperties: false,
};
