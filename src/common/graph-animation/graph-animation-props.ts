import { RefObject } from 'react';
import cytoscape from 'cytoscape';
import { Graph } from '../models';

export interface GraphAnimationProps {
  stepControlPanel: JSX.Element;
  containerRef: RefObject<HTMLDivElement> | undefined;
}
