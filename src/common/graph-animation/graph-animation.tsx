import React from 'react';
import { Box, Text } from 'grommet';
import { GraphAnimationProps, ListViewPanel } from './';

const GraphAnimation = (props: GraphAnimationProps): JSX.Element => {
  const queue = props.queue;
  const visited = props.visited;
  return (
    <Box height="100%" width="100%" direction="row">
      <Box pad="small" direction="column" width="75%">
        <Box pad={{ top: 'none', bottom: 'small' }} flex={false} align="center">
          <Text size="xsmall" weight="bold">
            ** Click and Drag to move Graph, Scroll Up and Down to Zoom **
          </Text>
        </Box>
        <Box
          className="graph-visualization"
          round="small"
          elevation="large"
          ref={props.containerRef}
          height="70vh"
        />
      </Box>
      <Box
        pad={{ left: 'small', right: 'small', top: 'small' }}
        width="25%"
        direction="column"
      >
        {props.stepControlPanel}
        <ListViewPanel data={queue} label="Queue" height="50%" />
        <ListViewPanel data={visited} label="Visited Nodes" height="50%" />
      </Box>
    </Box>
  );
};
export default GraphAnimation;
