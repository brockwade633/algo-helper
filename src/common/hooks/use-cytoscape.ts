import React, { RefObject, useEffect, Dispatch, SetStateAction } from 'react';
import cytoscape, { CytoscapeOptions, LayoutOptions } from 'cytoscape';
import { cytoWrapper } from '../../bfs';

export const useCytoscape = (
  data: cytoscape.ElementDefinition[] | undefined,
  ref: RefObject<HTMLDivElement>,
) => {
  const updateCytoscapeConfig = () => {
    cytoWrapper(data, ref);
  };

  useEffect(() => {
    updateCytoscapeConfig();
  });
};
