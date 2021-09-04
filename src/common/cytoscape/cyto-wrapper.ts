import { RefObject } from 'react';
import cytoscape, { CytoscapeOptions, LayoutOptions } from 'cytoscape';

export const cytoWrapper = (
  data: cytoscape.ElementDefinition[] | undefined,
  ref: RefObject<HTMLDivElement>,
) => {
  try {
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
        animate: false,
      },
      headless: false,
    };
    const cy = cytoscape(config);
  } catch (error) {
    console.warn(error);
  }
};
