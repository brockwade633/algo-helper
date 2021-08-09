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
import { handlePrev, handleReset, handleNext } from '../../../bfs';
import { StepControlPanelProps } from './';

const StepControlPanel = (props: StepControlPanelProps): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false);

  const stepControl$ = new Subject();

  const graphStr = props.graphStr;
  const queue = props.queue;
  const updateQueue = props.updateQueue;
  const visited = props.visited;
  const updateVisited = props.updateVisited;
  const cytoData = props.cytoData;
  const updateCytoData = props.updateCytoData;
  const ref = props.containerRef;

  const previous = () => {
    const newCyto = handlePrev(
      graphStr,
      queue,
      updateQueue,
      visited,
      updateVisited,
      cytoData,
      updateCytoData,
    );
    stepControl$.next(newCyto);
  };
  const reset = () => {
    setIsPlaying(false);
    const newCyto = handleReset(
      graphStr,
      queue,
      updateQueue,
      visited,
      updateVisited,
      cytoData,
      updateCytoData,
    );
    stepControl$.next(newCyto);
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
      graphStr,
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
      pad={{ top: 'none', bottom: 'medium' }}
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
        background="#ffa500"
        round="small"
        flex={false}
        elevation="large"
        direction="row"
      >
        <Button
          icon={<Previous size="26px" color="black" />}
          hoverIndicator={true}
          onClick={previous}
        />
        <Button
          icon={<Refresh size="26px" color="black" />}
          hoverIndicator={true}
          onClick={reset}
        />
        <Button
          icon={
            isPlaying ? (
              <PauseFill size="26px" color="black" />
            ) : (
              <PlayFill size="26px" color="black" />
            )
          }
          hoverIndicator={true}
          onClick={isPlaying ? pause : play}
          disabled={true}
        />
        <Button
          icon={<Next size="26px" color="black" />}
          hoverIndicator={true}
          onClick={next}
        />
      </Box>
    </Box>
  );
};
export default StepControlPanel;
