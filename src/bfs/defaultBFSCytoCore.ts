import { RefObject } from 'react';
import cytoscape, { CytoscapeOptions } from 'cytoscape';

export const defaultBFSCytoCore = (
  ref: RefObject<HTMLDivElement>,
  data: cytoscape.ElementDefinition[] | undefined,
) => {
  if (ref) {
    const config: CytoscapeOptions = {
      container: ref.current,
      style: [
        {
          selector: 'node',
          style: { content: 'data(value)', 'text-valign': 'center' },
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
          },
        },
      ],
      elements: data,
      layout: {
        name: 'breadthfirst',
        fit: true,
        padding: 50,
        //boundingBox: undefined,
        animate: true,
        animationDuration: 300,
        animationEasing: undefined,
        //transform: function (node: any, pos: any){ return pos; }
      },
    };
    console.log(config);
    return cytoscape(config);
  }
};
