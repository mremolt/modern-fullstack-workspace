export const personSchema = {
  definitions: {},
  $id: 'http://example.com/root.json',
  type: 'object',
  title: 'Person',
  required: ['firstName', 'lastName'],
  additionalProperties: false,
  properties: {
    id: {
      $id: '#/properties/id',
      type: 'integer',
      title: 'Id',
      examples: [1],
    },
    firstName: {
      $id: '#/properties/firstName',
      type: 'string',
      title: 'Firstname',
      default: '',
      examples: ['Arthur'],
      minLength: 3,
    },
    lastName: {
      $id: '#/properties/lastName',
      type: 'string',
      title: 'Lastname',
      default: '',
      examples: ['Dent'],
      minLength: 3,
    },
    email: {
      $id: '#/properties/email',
      type: 'string',
      title: 'Email',
      default: '',
      examples: ['towel@earth.com'],
      format: 'email',
    },
  },
};

export default personSchema;
