import { RefObject, useEffect } from 'react';
import cytoscape from 'cytoscape';
import { cytoWrapper } from '../';

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
