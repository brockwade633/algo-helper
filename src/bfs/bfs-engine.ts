import { Graph } from '../common/models';
import cytoscape from 'cytoscape';

export const handleNext = (
  graph: Graph,
  queue: number[],
  updateQueue: Function,
  visited: number[],
  updateVisited: Function,
  cytoData: cytoscape.ElementDefinition[],
  updateCytoData: Function,
) => {
  if (!graph.rootId) return;

  // pop off next node
  const currNodeId = queue.pop();

  // find neighbors and add to queue
  const currNode = graph.adjacencyList.filter(
    (node) => node.id === currNodeId,
  )[0];
  for (const nodeId of currNode.neighbors) {
    queue.unshift(nodeId);
  }
  updateQueue(queue);

  // add current node to visited list
  currNodeId && visited.push(currNodeId);
  updateVisited(visited);

  // modify cytodata to represent visited node
  const newCytodata = cytoData.map((data) => {
    return data.data.id === `n${currNodeId}`
      ? { ...data, style: { 'background-color': 'red' } }
      : data;
  });
  updateCytoData(newCytodata);

  return newCytodata;
};
