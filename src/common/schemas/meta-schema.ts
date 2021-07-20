import { JSONSchemaType } from 'ajv';
import { MetaData } from '../models';

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
