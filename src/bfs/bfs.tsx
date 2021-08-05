import React, { useRef, useState, RefObject } from 'react';
import SplitPane from 'react-split-pane';
import { Markdown } from 'grommet';
import { BFSWrapper, cytoBFSTransform, defaultBFS, QueueContext, VisitedContext } from './';
import {
  GraphAnimation,
  GraphInfo,
  GraphSchema,
  validateGraph,
  useCytoscape,
  cytoWrapper
} from '../common';
import { ErrorObject } from 'ajv';
import cytoscape from 'cytoscape';

const BFS = (): JSX.Element => {
  const currRef = useRef<HTMLDivElement>(null);

  // Change to [graphStr, setGraphStr]
  const [text, setText] = useState(JSON.stringify(defaultBFS, undefined, 2));
  const [errors, setErrors] = useState<
    ErrorObject<string, Record<string, any>, unknown>[]
  >([]);
  const [cytoData, setCytoData] = useState<
    cytoscape.ElementDefinition[] | undefined
  >(cytoBFSTransform(defaultBFS));

  const [queue, setQueue] = useState<number[]>([JSON.parse(text).rootId]);
  const [visited, setVisited] = useState<number[]>([]);

  const parseSource = (sourceText: string) => {
    try {
      const sourceJson = JSON.parse(sourceText);
      const errs = validateGraph(sourceJson, GraphSchema);
      if (errs) {
        setErrors(errs);
      } else {
        setCytoData(cytoBFSTransform(sourceJson));
        setErrors([]);
      }
      const prettyText = JSON.stringify(sourceJson, undefined, 2);
      return prettyText;
    } catch (err) {
      setErrors([err]);
      return sourceText;
    }
  };

  const handleBFSGraphSourceChange = (source: string) => {
    setText(parseSource(source));
  };

  const handleBFSCytoChange = (ref: RefObject<HTMLDivElement>) => {
    if (ref) {
      useCytoscape(cytoData, ref);
    }
  };

  // const updateBFSState = (newQueue: number[], newVisited: number[]) => {
  //   setQueue(newQueue);
  //   setVisited(newVisited);
  // };

  const bfsState = {
    queue: queue,
    updateQueue: (newQueue: number[]) => {
      setQueue(newQueue);
    },
    visited: visited,
    updateVisited: (newVisited: number[]) => {
      setVisited(newVisited);
    }
  }

  return (
    <BFSWrapper>
      <SplitPane
        split="vertical"
        defaultSize="60%"
        onChange={() => {
          cytoWrapper(cytoData, currRef);
        }}
      >
        <SplitPane
          split="horizontal"
          defaultSize="50%"
          onChange={() => {
            cytoWrapper(cytoData, currRef);
          }}
        >
          {/* <QueueContext.Provider>
            <VisitedContext.Provider> */}
              <GraphAnimation
                {...{
                  graph: JSON.parse(text),
                  sourceCytoData: cytoData,
                  containerRef: currRef,
                  algoState: bfsState,
                }}
              />
            {/* </VisitedContext.Provider>
          </QueueContext.Provider> */}
          <GraphInfo
            {...{
              containerRef: currRef,
              source: text,
              errors: errors,
              handleSourceChange: handleBFSGraphSourceChange,
              handleCytoChange: handleBFSCytoChange,
            }}
          />
        </SplitPane>
        <div>Breadth First Search</div>
      </SplitPane>
    </BFSWrapper>
  );
};
export default BFS;
