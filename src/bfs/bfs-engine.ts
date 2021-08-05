import { createContext, Context, useContext } from 'react';
import { Graph } from '../common/models';

export const handleBFSAlgoActions = (
  action: string,
  graph: Graph,
  queueContext: Context<number[]>,
  visitedContext: Context<number[]>,
) => {
  let queue = useContext(queueContext);
  let visited = useContext(visitedContext);
  if (action === 'next') {
    const currNode = queue.pop();
  }
};

//
// Maybe:
//
// Implement methods for each of the actions, that each onClick method can leverage:
//
// export const handlePrev = () => {}
// export const handleNext = () => {}
//  .
//  .
//  .
//
