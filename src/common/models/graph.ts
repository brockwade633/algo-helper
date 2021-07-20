import { Node, MetaData } from './';

export interface Graph {
  meta: MetaData;
  adjacencyList: Node[];
}
