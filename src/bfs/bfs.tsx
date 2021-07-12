import React, { useRef } from 'react';
import SplitPane from 'react-split-pane';
import { GraphAnimation } from '../common';
import { BFSWrapper } from './bfs-wrapper';
import { GraphSource } from '../common';
import { validateGraph } from '../common';
import { cytoBFSTransform } from './bfs-cyto-transform';

const BFS = (): JSX.Element => {

    const currRef = useRef<HTMLDivElement>(null);

    return (
        <BFSWrapper>
            <SplitPane split="vertical" defaultSize="70%">
                <SplitPane split="horizontal" defaultSize="50%">
                    <GraphAnimation {...{ containerRef: currRef }} />
                    <GraphSource {...{ containerRef: currRef, validate: validateGraph, transform: cytoBFSTransform }} />
                </SplitPane>
                <div>
                    HELLO WORLD
                </div>
            </SplitPane>
        </BFSWrapper>
    );
}
export default BFS;