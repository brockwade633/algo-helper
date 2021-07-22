import { ErrorObject } from 'ajv';

export interface GraphSourceProps {
  source: string;
  errors: ErrorObject<string, Record<string, any>, unknown>[];
  handleSourceChange: Function;
}
