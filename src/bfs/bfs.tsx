import React, { useRef } from 'react';
import SplitPane from 'react-split-pane';
import { GraphAnimation } from '../common';
import { BFSWrapper, cytoBFSTransform, defaultBFS } from './';
import { GraphSource } from '../common';
import { validateGraph } from '../common';

const BFS = (): JSX.Element => {
  const currRef = useRef<HTMLDivElement>(null);

  return (
    <BFSWrapper>
      <SplitPane split="vertical" defaultSize="70%">
        <SplitPane split="horizontal" defaultSize="50%">
          <GraphAnimation {...{ containerRef: currRef }} />
          <GraphSource
            {...{
              containerRef: currRef,
              validate: validateGraph,
              transform: cytoBFSTransform,
              default: defaultBFS,
            }}
          />
        </SplitPane>
        <div>HELLO WORLD</div>
      </SplitPane>
    </BFSWrapper>
  );
};
export default BFS;
