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

const StepControls = (): JSX.Element => {
  return (
    <Box pad="small" flex={false} align="center">
      <Box
        pad="xsmall"
        background="silver"
        round="small"
        flex={false}
        elevation="large"
        direction="row"
      >
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
  );
};
export default StepControls;
