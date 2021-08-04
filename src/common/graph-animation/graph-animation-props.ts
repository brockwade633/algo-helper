import { RefObject } from 'react';
import cytoscape from 'cytoscape';

export interface GraphAnimationProps {
  root: number | undefined;
  sourceCytoData: cytoscape.ElementDefinition[] | undefined;
  containerRef: RefObject<HTMLDivElement> | undefined;
}
