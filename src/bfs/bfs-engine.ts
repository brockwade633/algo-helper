import { Graph } from '../common/models';
import cytoscape from 'cytoscape';

export const handlePrev = (
  graphStr: string,
  queue: number[],
  updateQueue: Function,
  visited: number[],
  updateVisited: Function,
  cytoData: cytoscape.ElementDefinition[],
  updateCytoData: Function,
): cytoscape.ElementDefinition[] => {
  let graph;
  try {
    graph = JSON.parse(graphStr);
  } catch (error) {
    return cytoData;
  }

  // get the node most recently visited
  const lastNodeId = visited.pop();
  updateVisited(visited);

  // push the most recently visited node back onto the queue
  lastNodeId && queue.push(lastNodeId);

  // remove the relevant nodes from the queue
  // (neighbors that haven't been reached yet, and that aren't a neighbor of any previously visited nodes)
  const lastNode = graph.adjacencyList.filter(
    (node) => node.id === lastNodeId,
  )[0];
  while (
    lastNodeId &&
    lastNode.neighbors.includes(queue[0]) &&
    lastNodeId !== queue[0] &&
    !isNodeANeighborOfAVisitedNode(graph, visited, queue[0])
  ) {
    queue.shift();
  }
  updateQueue(queue);

  // revert cytodata styling to previous iteration
  const newCytodata = cytoData.map((data) => {
    if (queue.includes(Number(data.data.id?.slice(1)))) {
      return { ...data, style: { 'background-color': '#d4e6f2' } };
    } else if (visited.includes(Number(data.data.id?.slice(1)))) {
      return { ...data, style: { 'background-color': '#ffa500' } };
    } else {
      return { ...data, style: null };
    }
  });
  updateCytoData(newCytodata);

  return newCytodata;
};

export const handleReset = (
  graphStr: string,
  queue: number[],
  updateQueue: Function,
  visited: number[],
  updateVisited: Function,
  cytoData: cytoscape.ElementDefinition[],
  updateCytoData: Function,
) => {
  let graph;
  try {
    graph = JSON.parse(graphStr);
  } catch (error) {
    return cytoData;
  }

  // reset queue
  queue = [graph.rootId];
  updateQueue(queue);

  // reset visited list
  visited = [];
  updateVisited(visited);

  // reset cytodata styling
  const newCytoData = cytoData.map((data) => {
    if (data.data.id === `n${graph.rootId}`) {
      return { ...data, style: { 'background-color': '#d4e6f2' } };
    } else {
      return { ...data, style: null };
    }
  });
  updateCytoData(newCytoData);

  return newCytoData;
};

export const handleNext = (
  graphStr: string,
  queue: number[],
  updateQueue: Function,
  visited: number[],
  updateVisited: Function,
  cytoData: cytoscape.ElementDefinition[],
  updateCytoData: Function,
): cytoscape.ElementDefinition[] => {
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
  updateQueue(queue);

  // add current node to visited list
  currNodeId && visited.push(currNodeId);
  updateVisited(visited);

  // modify cytodata styling to represent visited node
  const newCytodata = cytoData.map((data) => {
    if (queue.includes(Number(data.data.id?.slice(1)))) {
      return { ...data, style: { 'background-color': '#d4e6f2' } };
    } else if (data.data.id === `n${currNodeId}`) {
      return { ...data, style: { 'background-color': '#ffa500' } };
    } else {
      return data;
    }
  });
  updateCytoData(newCytodata);

  return newCytodata;
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
