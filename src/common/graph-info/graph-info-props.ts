import { RefObject } from 'react';
import { ErrorObject } from 'ajv';

export interface GraphInfoProps {
  containerRef: RefObject<HTMLDivElement> | undefined;
  source: string;
  errors: ErrorObject<string, Record<string, any>, unknown>[];
  handleSourceChange: Function;
  handleCytoChange: Function;
}
