import { Graph } from '../common/models';
import cytoscape from 'cytoscape';

export const cytoBFSTransform = (json: Graph) => {
  let cytoData: cytoscape.ElementDefinition[] = [];
  let e = 0;
  for (const node of json.adjacencyList) {
    // node
    cytoData.push({
      data: { id: `n${node.id}`, value: node.value },
    });
    // edges
    if (node.neighbors.length) {
      for (const neighbor of node.neighbors) {
        cytoData.push({
          data: {
            id: e.toString(),
            source: `n${node.id}`,
            target: `n${neighbor}`,
          },
        });
        e++;
      }
    }
  }

  return cytoData;
};
