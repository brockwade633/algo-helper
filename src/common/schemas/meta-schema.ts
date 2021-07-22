import { JSONSchemaType } from 'ajv';
import { MetaData } from '../models';

/**
 * For some reason ajv validations don't work when these nested sub-schemas are referenced
 * from the top level graph schema. Not using them currently but we'll keep them around for
 * now, as a reference.
 */
export const MetaSchema: JSONSchemaType<MetaData> = {
  $id: 'algo-helper/meta.json',
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    author: {
      type: 'string',
      nullable: true,
    },
  },
  required: ['title'],
  additionalProperties: false,
};
