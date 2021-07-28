import React from 'react';
import { Box } from 'grommet';
import { GraphAnimationProps } from './';
import { StepControls } from './step-controls';

const GraphAnimation = (props: GraphAnimationProps): JSX.Element => {
  return (
    <Box height="100%" width="100%" direction="row">
      <Box pad="small" direction="column" width="75%">
        <StepControls />
        <Box
          border={{
            color: 'black',
            size: 'xsmall',
            style: 'solid',
            side: 'all',
          }}
          round="small"
          elevation="large"
          ref={props.containerRef}
          height="70vh"
        />
      </Box>
      <Box width="25%">Data Structures State</Box>
    </Box>
  );
};
export default GraphAnimation;
