import { JSONSchemaType } from 'ajv';
import { Node } from '../models';

/**
 * For some reason ajv validations don't work when these nested sub-schemas are referenced
 * from the top level graph schema. Not using them currently but we'll keep them around for
 * now, as a reference.
 */
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
