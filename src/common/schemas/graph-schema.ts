import { JSONSchemaType } from 'ajv';
import { Graph } from '../models';

export const GraphSchema: JSONSchemaType<Graph> = {
  $id: 'algo-helper/schema.json',
  type: 'object',
  properties: {
    meta: {
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
    rootId: {
      type: 'integer',
    },
    adjacencyList: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          value: {
            type: 'string',
          },
          neighbors: {
            type: 'array',
            items: {
              type: 'integer',
            },
          },
        },
        required: ['id', 'value', 'neighbors'],
        additionalProperties: false,
      },
    },
  },
  required: ['meta', 'rootId', 'adjacencyList'],
  additionalProperties: false,
};
