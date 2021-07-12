import Ajv, { JSONSchemaType } from 'ajv';
import { Graph } from '../models';

export const validateGraph = (json: Graph, schema: JSONSchemaType<Graph>) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    let errors;
    if (!validate(json)) {
        errors = validate.errors;
    }
    console.log(errors);
    return errors;
};