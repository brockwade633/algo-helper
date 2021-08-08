import React, { useRef, useState, RefObject } from 'react';
import SplitPane from 'react-split-pane';
import { Markdown } from 'grommet';
import { BFSWrapper, cytoBFSTransform, defaultBFS } from './';
import {
  GraphAnimation,
  GraphInfo,
  GraphSchema,
  validateGraph,
  useCytoscape,
  cytoWrapper,
} from '../common';
import { ErrorObject } from 'ajv';
import cytoscape from 'cytoscape';
import { StepControlPanel } from '../common/graph-animation/step-control-panel';

const BFS = (): JSX.Element => {
  const currRef = useRef<HTMLDivElement>(null);

  const [graphStr, setGraphStr] = useState(
    JSON.stringify(defaultBFS, undefined, 2),
  );
  const [errors, setErrors] = useState<
    ErrorObject<string, Record<string, any>, unknown>[]
  >([]);
  const [cytoData, setCytoData] = useState<cytoscape.ElementDefinition[]>(
    cytoBFSTransform(defaultBFS),
  );

  const [queue, setQueue] = useState<number[]>([defaultBFS.rootId]);
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

  const controlPanel = (
    <StepControlPanel
      graphStr={graphStr}
      queue={queue}
      updateQueue={(newQueue: number[]) => {
        setQueue(newQueue);
      }}
      visited={visited}
      updateVisited={(newVisited: number[]) => {
        setVisited(newVisited);
      }}
      cytoData={cytoData}
      updateCytoData={(newCytoData: cytoscape.ElementDefinition[]) => {
        setCytoData(newCytoData);
      }}
      containerRef={currRef}
    />
  );

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
          defaultSize="60%"
          onChange={() => {
            cytoWrapper(cytoData, currRef);
          }}
        >
          <GraphAnimation
            containerRef={currRef}
            stepControlPanel={controlPanel}
          />
          <GraphInfo
            containerRef={currRef}
            source={graphStr}
            errors={errors}
            handleSourceChange={(source: string) => {
              setGraphStr(parseSource(source));
            }}
            handleCytoChange={(ref: RefObject<HTMLDivElement>) => {
              ref && useCytoscape(cytoData, ref);
            }}
          />
        </SplitPane>
        <div>Breadth First Search</div>
      </SplitPane>
    </BFSWrapper>
  );
};
export default BFS;
