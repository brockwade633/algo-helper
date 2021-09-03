import { Graph } from '../common/models';
import cytoscape from 'cytoscape';

export const handlePrev = (
  graphStr: string,
  queue: number[],
  updateQueue: Function,
  visited: number[],
  updateVisited: Function,
  cytoData: cytoscape.ElementDefinition[],
  updatePrevFrameCyto: Function,
) => {
  let graph;
  try {
    graph = JSON.parse(graphStr);
  } catch (error) {
    return cytoData;
  }

  // get the node most recently visited
  const lastNodeId = visited.pop();

  // push the most recently visited node back onto the queue
  lastNodeId && queue.push(lastNodeId);

  // remove the relevant nodes from the queue
  // (neighbors that haven't been reached yet, and that aren't a neighbor of any previously visited nodes)
  const lastNode = graph.adjacencyList.filter(
    (node) => node.id === lastNodeId,
  )[0];

  let firstQueueNode = queue[0];
  while (
    lastNodeId &&
    lastNode.neighbors.includes(firstQueueNode) &&
    lastNodeId !== firstQueueNode &&
    !isNodeANeighborOfAVisitedNode(graph, visited, firstQueueNode)
  ) {
    queue.shift();
    firstQueueNode = queue[0];
  }

  updateQueue(queue);
  updateVisited(visited);
  updatePrevFrameCyto(queue, visited);
};

export const handleReset = (
  graphStr: string,
  queue: number[],
  updateQueue: Function,
  visited: number[],
  updateVisited: Function,
  cytoData: cytoscape.ElementDefinition[],
  updateResetCyto: Function,
) => {
  let graph;
  try {
    graph = JSON.parse(graphStr);
  } catch (error) {
    return cytoData;
  }

  // reset queue
  queue = [graph.rootId];

  // reset visited list
  visited = [];

  updateQueue(queue);
  updateVisited(visited);
  updateResetCyto(graph.rootId);
};

export const handleNext = (
  graphStr: string,
  queue: number[],
  updateQueue: Function,
  visited: number[],
  updateVisited: Function,
  cytoData: cytoscape.ElementDefinition[],
  updateNextFrameCyto: Function,
) => {
  let graph;
  try {
    graph = JSON.parse(graphStr);
  } catch (error) {
    return cytoData;
  }

  if (!graph.rootId) {
    return cytoData;
  }

  // pop off next node
  const currNodeId = queue.pop();

  // find neighbors and add to queue
  const currNode = graph.adjacencyList.filter(
    (node) => node.id === currNodeId,
  )[0];
  for (const nodeId of currNode.neighbors) {
    if (!visited.includes(nodeId) && !queue.includes(nodeId)) {
      queue.unshift(nodeId);
    }
  }

  currNodeId && visited.push(currNodeId);

  updateQueue(queue);
  updateVisited(visited);
  updateNextFrameCyto(currNodeId, queue);
};

const isNodeANeighborOfAVisitedNode = (
  graph: Graph,
  visited: number[],
  nodeId: number,
): boolean => {
  for (const visitedNodeId of visited) {
    const node = graph.adjacencyList.filter(
      (nde) => nde.id === visitedNodeId,
    )[0];
    for (const neighborId of node.neighbors) {
      if (neighborId === nodeId) {
        return true;
      }
    }
  }
  return false;
};
