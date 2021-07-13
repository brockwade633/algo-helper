import { JSONSchemaType } from 'ajv';
import { Graph } from '../models';
import { NodeSchema, EdgeSchema } from '.';

export const GraphSchema: JSONSchemaType<Graph> = {
  $id: 'algo-helper/schema.json',
  type: 'object',
  properties: {
    nodes: {
      type: 'array',
      items: NodeSchema,
    },
    edges: {
      type: 'array',
      items: EdgeSchema,
    },
  },
  required: ['nodes', 'edges'],
  additionalProperties: false,
};
