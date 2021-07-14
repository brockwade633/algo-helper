import { RefObject } from 'react';
import { Graph } from '../models';
import { ErrorObject } from 'ajv';

export interface GraphSourceProps {
  containerRef: RefObject<HTMLDivElement> | undefined;
  source: string;
  errors: ErrorObject<string, Record<string, any>, unknown>[];
  handleSourceChange: Function;
  handleCytoChange: Function;
}
