import { JSONSchemaType } from 'ajv';
import { Node } from '../models';

export const NodeSchema: JSONSchemaType<Node> = {
  $id: 'algo-helper/node.json',
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
};
