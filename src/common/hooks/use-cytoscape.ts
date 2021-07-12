import { RefObject, useEffect } from 'react';
import cytoscape, { CytoscapeOptions, LayoutOptions } from 'cytoscape';

export const useCytoscape = (data: cytoscape.ElementDefinition[] | undefined, ref: RefObject<HTMLDivElement>) => {
    const updateCytoscapeConfig = () => {
        try {
            const config: CytoscapeOptions = {
                container: ref.current,
                style: [
                    {
                        selector: 'node',
                        style: { content: 'data(value)', 'text-valign': 'center' }
                    },
                    {
                        selector: 'edge',
                        style: { 'curve-style': 'bezier', 'target-arrow-shape': 'triangle' }
                    }
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
                }
            };
            cytoscape(config);

        } catch (error) {
            console.warn(error);   
        }
    };

    useEffect(() => {
        updateCytoscapeConfig();
    });
};