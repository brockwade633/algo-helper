import { Graph } from '../common/models';

export const cytoBFSTransform = (json: Graph) => {
  let cytoData = [];
  // nodes
  for (const node of json.nodes) {
    cytoData.push({
      data: { id: `n${node.id}`, value: node.value },
    });
  }

  // edges
  for (const edge of json.edges) {
    cytoData.push({
      data: {
        id: json.edges.indexOf(edge).toString(),
        source: `n${edge.from}`,
        target: `n${edge.to}`,
      },
    });
  }

  return cytoData;
};
