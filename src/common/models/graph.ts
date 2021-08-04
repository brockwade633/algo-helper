import { Node, MetaData } from './';

export interface Graph {
  meta: MetaData;
  rootId: number;
  adjacencyList: Node[];
}
