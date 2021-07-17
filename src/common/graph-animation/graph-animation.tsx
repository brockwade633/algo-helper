import React from 'react';
import { GraphAnimationProps } from './';

const GraphAnimation = (props: GraphAnimationProps): JSX.Element => {
  return <div ref={props.containerRef} style={{ width: '100%' }} />;
};
export default GraphAnimation;
