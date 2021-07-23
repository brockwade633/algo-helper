import React from 'react';
import { Box } from 'grommet';
import {
  Play,
  PlayFill,
  PauseFill,
  Refresh,
  Previous,
  Next,
  FastForward,
  Rewind,
} from 'grommet-icons';
import { GraphAnimationProps } from './';

const GraphAnimation = (props: GraphAnimationProps): JSX.Element => {
  return (
    <Box ref={props.containerRef} direction="column" height="100%" width="100%">
      <Box align="center">
        <Box pad="small" direction="row">
          <Box pad={{ left: 'small', right: 'small' }}>
            <Previous size="28px" color="black" />
          </Box>
          <Box pad={{ left: 'small', right: 'small' }}>
            <Refresh size="28px" color="black" />
          </Box>
          <Box pad={{ left: 'small', right: 'small' }}>
            <PlayFill size="28px" color="black" />
          </Box>
          <Box pad={{ left: 'small', right: 'small' }}>
            <Next size="28px" color="black" />
          </Box>
        </Box>
      </Box>
      <Box ref={props.containerRef} width="100%" />
    </Box>
  );
};
export default GraphAnimation;
