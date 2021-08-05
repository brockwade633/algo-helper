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

const StepControlPanel = (props): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false);

  const stepControl$ = new Subject();

  // consider making the graph, queue, visited all react contexts? 
  const graph = props.graph;
  
  const queue = props.algoState.queue;
  const updateQueue = props.algoState.updateQueue;
  const visited = props.algoState.visited;
  const visitedQueue = props.algoState.updateVisited;

  //
  // For each of the actions, find the right node in the queue or visited list
  // and adjust the style of that node accordingly, inside the cytoData. Then
  // use setCytoData to update global state, and pass the new data to the cytoWrapper.
  //
  // Maybe:
  //
  // -> Inside of each action method:
  //    1. move the algo forward / back by creating the appropriate updated cytodata collection, using the queue context
  //    2. call setCytoData => update global state
  //    3. pass the updated cytodata collection onto the step control stream
  //    4. update queue / visited contexts
  //
  // -> Inside useEffect, inside the stream subscribe callback:
  //    1.  call cytoWrapper with the cytodata collection received from the stream
  //

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
    console.log(queue);
    console.log(graph);
    
    stepControl$.next('next');
  };

  useEffect(() => {
    stepControl$.subscribe((action) => {
      if (action === 'next') {
        cytoWrapper(props.sourceCytoData, props.containerRef);
      }
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
        {/* {isPlaying ? (<Button id="alg-stp-pause" icon={<PauseFill size="16px" color="black" />} hoverIndicator={true} onClick={pause} />) : (<Button id="alg-stp-play" icon={<PlayFill size="16px" color="black" />} hoverIndicator={true} onClick={play} />)} */}
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
