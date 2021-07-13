import { RefObject } from 'react';
import { Graph } from '../models';

export interface GraphSourceProps {
  containerRef: RefObject<HTMLDivElement> | undefined;
  validate: Function;
  transform: Function;
  default: Graph;
}
