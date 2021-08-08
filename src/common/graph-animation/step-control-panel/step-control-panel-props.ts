import { RefObject } from 'react';
import { Graph } from '../../';
import cytoscape from 'cytoscape';

export interface StepControlPanelProps {
  graphStr: string;
  queue: number[];
  updateQueue: Function;
  visited: number[];
  updateVisited: Function;
  cytoData: cytoscape.ElementDefinition[];
  updateCytoData: Function;
  containerRef: RefObject<HTMLDivElement> | undefined;
}
