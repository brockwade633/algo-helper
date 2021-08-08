import React, { useState, useEffect } from 'react';
import { Box, Button, Text } from 'grommet';
import {
  Play,
  PlayFill,
  PauseFill,
  Refresh,
  Previous,
  Next,
  FastForward,
  Rewind,
  Pause,
} from 'grommet-icons';
import { Subject } from 'rxjs';
import { cytoWrapper } from '../..';
import cytoscape from 'cytoscape';
import { handleNext } from '../../../bfs';
import { StepControlPanelProps } from './';

const StepControlPanel = (props: StepControlPanelProps): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false);

  const stepControl$ = new Subject();

  let graph;
  try {
    graph = JSON.parse(props.graphStr);
  } catch (error) {
    graph = {};
  }
  const queue = props.queue;
  const updateQueue = props.updateQueue;
  const visited = props.visited;
  const updateVisited = props.updateVisited;
  const cytoData = props.cytoData;
  const updateCytoData = props.updateCytoData;
  const ref = props.containerRef;

  const previous = () => {
    stepControl$.next('prev');
  };
  const reset = () => {
    setIsPlaying(false);
    stepControl$.next('reset');
  };
  const play = () => {
    setIsPlaying(true);
    stepControl$.next('play');
  };
  const pause = () => {
    setIsPlaying(false);
    stepControl$.next('pause');
  };
  const next = () => {
    const newCyto = handleNext(
      graph,
      queue,
      updateQueue,
      visited,
      updateVisited,
      cytoData,
      updateCytoData,
    );
    stepControl$.next(newCyto);
  };

  useEffect(() => {
    stepControl$.subscribe((data: cytoscape.ElementDefinition[]) => {
      ref && cytoWrapper(data, ref);
    });
  });

  return (
    <Box
      pad={{ top: 'none', bottom: 'small' }}
      flex={false}
      align="center"
      direction="column"
    >
      <Box direction="row">
        <Text
          size="xsmall"
          weight="bold"
          margin={{
            left: 'small',
            right: 'small',
            top: 'none',
            bottom: 'xsmall',
          }}
        >
          F9
        </Text>
        <Text
          size="xsmall"
          weight="bold"
          margin={{
            left: 'small',
            right: 'small',
            top: 'none',
            bottom: 'xsmall',
          }}
        >
          F4
        </Text>
        <Text
          size="xsmall"
          weight="bold"
          margin={{
            left: 'small',
            right: 'small',
            top: 'none',
            bottom: 'xsmall',
          }}
        >
          F5
        </Text>
        <Text
          size="xsmall"
          weight="bold"
          margin={{
            left: 'small',
            right: 'small',
            top: 'none',
            bottom: 'xsmall',
          }}
        >
          F10
        </Text>
      </Box>
      <Box
        background="silver"
        round="small"
        flex={false}
        elevation="large"
        direction="row"
      >
        <Button
          icon={<Previous size="16px" color="black" />}
          hoverIndicator={true}
          onClick={previous}
        />
        <Button
          icon={<Refresh size="16px" color="black" />}
          hoverIndicator={true}
          onClick={reset}
        />
        <Button
          icon={
            isPlaying ? (
              <PauseFill size="16px" color="black" />
            ) : (
              <PlayFill size="16px" color="black" />
            )
          }
          hoverIndicator={true}
          onClick={isPlaying ? pause : play}
        />
        <Button
          icon={<Next size="16px" color="black" />}
          hoverIndicator={true}
          onClick={next}
        />
      </Box>
    </Box>
  );
};
export default StepControlPanel;
