import React from 'react';
import { GraphAnimationProps } from './';

const GraphAnimation = (props: GraphAnimationProps): JSX.Element => {
  // if (props.containerRef && props.containerRef.current) {
  //   props.isRendered(true);
  // }
  return <div ref={props.containerRef} style={{ width: '100%' }} />;
};
export default GraphAnimation;
