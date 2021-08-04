import React from 'react';
import { Box, Text } from 'grommet';
import { GraphAnimationProps } from './';
import { StepControlPanel } from './step-controls';

const GraphAnimation = (props: GraphAnimationProps): JSX.Element => {
  return (
    <Box height="100%" width="100%" direction="row">
      <Box pad="small" direction="column" width="75%">
        <Box pad={{ top: "none", bottom: "small" }} flex={false} align="center">
          <Text size="xsmall" weight="bold">** Click and Drag to move Graph, Scroll Up and Down to Zoom **</Text>
        </Box>
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
      <Box pad="small" width="25%" direction="column">
        <StepControlPanel {...{ root: props.root, sourceCytoData: props.sourceCytoData, containerRef: props.containerRef }} />
      </Box>
    </Box>
  );
};
export default GraphAnimation;
