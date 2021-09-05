import { Graph, AbstractList } from '../common';
import cytoscape from 'cytoscape';

export const handlePrev = (
  graphStr: string,
  queue: AbstractList,
  updateQueue: Function,
  visited: AbstractList,
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
  const lastNodeId = visited.popOffBack();

  // push the most recently visited node back onto the queue
  lastNodeId && queue.appendToBack(lastNodeId);

  const lastNode = graph.adjacencyList.filter(
    (node) => node.id === lastNodeId,
  )[0];

  // remove the relevant nodes from the queue
  // (neighbors that haven't been reached yet, and that aren't a neighbor of any previously visited nodes)
  while (
    lastNodeId &&
    lastNode.neighbors.includes(queue.peekFront()) &&
    lastNodeId !== queue.peekFront() &&
    !isNodeANeighborOfAVisitedNode(graph, visited.dump(), queue.peekFront())
  ) {
    queue.popOffFront();
  }

  updateQueue(queue.dump());
  updateVisited(visited.dump());
  updatePrevFrameCyto(queue.dump(), visited.dump());
};

export const handleReset = (
  graphStr: string,
  queue: AbstractList,
  updateQueue: Function,
  visited: AbstractList,
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
  queue.flush();
  queue.appendToFront(graph.rootId);

  // reset visited list
  visited.flush();

  updateQueue(queue.dump());
  updateVisited(visited.dump());
  updateResetCyto(graph.rootId);
};

export const handleNext = (
  graphStr: string,
  queue: AbstractList,
  updateQueue: Function,
  visited: AbstractList,
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
  const currNodeId = queue.popOffBack();

  // find neighbors and add to queue
  const currNode = graph.adjacencyList.filter(
    (node) => node.id === currNodeId,
  )[0];
  for (const nodeId of currNode.neighbors) {
    if (!visited.dump().includes(nodeId) && !queue.dump().includes(nodeId)) {
      queue.appendToFront(nodeId);
    }
  }

  currNodeId && visited.appendToBack(currNodeId);

  updateQueue(queue.dump());
  updateVisited(visited.dump());
  updateNextFrameCyto(currNodeId, queue.dump());
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
