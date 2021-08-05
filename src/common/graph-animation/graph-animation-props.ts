import { RefObject } from 'react';
import cytoscape from 'cytoscape';
import { Graph } from '../models';

export interface GraphAnimationProps {
  graph: Graph | undefined;
  sourceCytoData: cytoscape.ElementDefinition[] | undefined;
  containerRef: RefObject<HTMLDivElement> | undefined;
  algoState: any;
}
