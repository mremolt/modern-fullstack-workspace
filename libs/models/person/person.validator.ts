import ajv from 'ajv';
import personSchema from './person.schema';

const inst = new ajv({ allErrors: true });

export const personValidator = inst.compile(personSchema);

