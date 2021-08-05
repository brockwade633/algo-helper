import { createContext } from 'react';

export const VisitedContext = createContext({
  visited: [],
  updateVisited: () => {},
});
