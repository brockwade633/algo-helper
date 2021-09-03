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
import { Subject, interval, Subscription, Observable } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { cytoWrapper } from '../..';
import cytoscape from 'cytoscape';
import { handlePrev, handleReset, handleNext } from '../../../bfs';
import { StepControlPanelProps } from './';

const StepControlPanel = (props: StepControlPanelProps): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frameEmitterSub, setFrameEmitterSub] = useState<Subscription>(
    new Subscription(),
  );

  const stepControl$ = new Subject();

  const graphStr = props.graphStr; // we won't update the graph str in this component so don't make a copy
  const queue = [...props.queue];
  const visited = [...props.visited];
  const cytoData = [...props.cytoData];

  const updateQueue = props.updateQueue;
  const updateVisited = props.updateVisited;
  const updateNextFrameCytoData = props.updateNextFrameCytoData;
  const updatePrevFrameCytoData = props.updatePrevFrameCytoData;
  const updateResetCytoData = props.updateResetCytoData;

  const ref = props.containerRef;

  const prevIter = () => {
    handlePrev(
      graphStr,
      queue,
      updateQueue,
      visited,
      updateVisited,
      cytoData,
      updatePrevFrameCytoData,
    );
    stepControl$.next(cytoData);
  };
  const reset = () => {
    frameEmitterSub.unsubscribe();
    setIsPlaying(false);
    handleReset(
      graphStr,
      queue,
      updateQueue,
      visited,
      updateVisited,
      cytoData,
      updateResetCytoData,
    );
    stepControl$.next(cytoData);
  };
  const play = () => {
    setIsPlaying(true);

    if (queue.length) {
      const algoFrameEmitter = interval(1000).pipe(
        takeWhile(() => queue.length > 0),
      );

      setFrameEmitterSub(
        algoFrameEmitter.subscribe({
          next: (n) => {
            nextIter();
          },
          error: (e) => console.log(`Control Panel Observable Error: ${e}`),
          complete: () => setIsPlaying(false),
        }),
      );
    } else {
      setIsPlaying(false);
      frameEmitterSub.unsubscribe();
    }
  };
  const pause = () => {
    setIsPlaying(false);
    frameEmitterSub.unsubscribe();
  };
  const nextIter = () => {
    handleNext(
      graphStr,
      queue,
      updateQueue,
      visited,
      updateVisited,
      cytoData,
      updateNextFrameCytoData,
    );
    stepControl$.next(cytoData);
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
          onClick={prevIter}
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
        />
        <Button
          icon={<Next size="26px" color="black" />}
          hoverIndicator={true}
          onClick={nextIter}
        />
      </Box>
    </Box>
  );
};
export default StepControlPanel;
