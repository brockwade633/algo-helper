import { JSONSchemaType } from 'ajv';
import { Edge } from '../models';

export const EdgeSchema: JSONSchemaType<Edge> = {
    $id: "algo-helper/edge.json",
    type: "object",
    properties: {
        from: {
            type: "integer"
        },
        to: {
            type: "integer"
        },
        weight: {
            type: "integer",
            nullable: true
        }
    },
    required: ["from", "to"],
    additionalProperties: false
};