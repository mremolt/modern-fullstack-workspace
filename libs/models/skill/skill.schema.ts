export const skillSchema = {
  type: 'object',
  title: 'Skill',
  required: ['id', 'name'],
  additionalProperties: false,
  properties: {
    id: {
      $id: '#/properties/id',
      type: 'number',
      title: 'Id',
      default: null,
      minimum: 1,
      examples: [1],
    },
    name: {
      $id: '#/properties/name',
      type: 'string',
      title: 'Name',
      default: '',
      examples: ['Shaving Yaks'],
      minLength: 3,
    },
  },
};

export default skillSchema;
