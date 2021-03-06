export const personSkillSchema = {
  type: 'object',
  title: 'PersonSkill',
  required: ['id', 'level', 'person_id', 'skill_id'],
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
    personId: {
      $id: '#/properties/personId',
      type: 'number',
      title: 'PersonId',
      default: null,
      minimum: 1,
      examples: [1],
    },
    skillId: {
      $id: '#/properties/skillId',
      type: 'number',
      title: 'SkillId',
      default: null,
      minimum: 1,
      examples: [1],
    },
    level: {
      $id: '#/properties/level',
      type: 'string',
      title: 'Level',
      default: '',
      examples: ['Master', 'Noob'],
      minLength: 3,
    },
  },
};

export default personSkillSchema;
