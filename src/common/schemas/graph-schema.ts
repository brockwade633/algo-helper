import { JSONSchemaType } from 'ajv';
import { Graph } from '../models';
import { MetaSchema, NodeSchema } from './';

export const GraphSchema: JSONSchemaType<Graph> = {
  $id: 'algo-helper/schema.json',
  type: 'object',
  properties: {
    meta: {
      // for some reason ajv throws errors when MetaSchema is referenced here externally
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
    },
    adjacencyList: {
      type: 'array',
      items: NodeSchema,
    },
  },
  required: ['meta', 'adjacencyList'],
  additionalProperties: false,
};
