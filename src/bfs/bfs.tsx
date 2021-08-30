import React, { useRef, useState, RefObject } from 'react';
import SplitPane from 'react-split-pane';
import { BFSWrapper, cytoBFSTransform, defaultBFS, BFSCommentary } from './';
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
import { handlePrev, handleReset } from './bfs-engine';

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

  const updateQueue = (newQueue: number[]) => {
    setQueue(newQueue);
  };

  const queuePush = (node: number) => {
    setQueue((q) => {
      q.unshift(node);
      return q;
    });
  };

  const queuePop = () => {
    let poppedNode;
    setQueue((q) => {
      poppedNode = q.pop();
      return q;
    });
    return poppedNode;
  };

  const updateVisited = (newVisited: number[]) => {
    setVisited(newVisited);
  };

  const removeMostRecentVisited = () => {
    let poppedNode;
    setVisited((v) => {
      poppedNode = v.pop();
      return v;
    });
    return poppedNode;
  };

  const addToVisited = (node: number) => {
    setVisited((v) => {
      v.push(node);
      return v;
    });
  };

  const updateCytoData = (newCytoData: cytoscape.ElementDefinition[]) => {
    setCytoData(newCytoData);
  };

  const handleNextFrameCytoData = (currNodeId: number, queue: number[]) => {
    setCytoData((prevData) =>
      prevData.map((data) => {
        if (queue.includes(Number(data.data.id?.slice(1)))) {
          return { ...data, style: { 'background-color': '#d4e6f2' } };
        } else if (data.data.id === `n${currNodeId}`) {
          return { ...data, style: { 'background-color': '#ffa500' } };
        } else {
          return data;
        }
      }),
    );
  };

  const handlePrevFrameCytoData = (queue: number[], visited: number[]) => {
    setCytoData((prevData) =>
      prevData.map((data) => {
        if (queue.includes(Number(data.data.id?.slice(1)))) {
          return { ...data, style: { 'background-color': '#d4e6f2' } };
        } else if (visited.includes(Number(data.data.id?.slice(1)))) {
          return { ...data, style: { 'background-color': '#ffa500' } };
        } else {
          return { ...data, style: null };
        }
      }),
    );
  };

  const controlPanel = (
    <StepControlPanel
      graphStr={graphStr}
      queue={queue}
      updateQueue={updateQueue}
      visited={visited}
      updateVisited={updateVisited}
      cytoData={cytoData}
      updateCytoData={updateCytoData}
      updateNextFrameCytoData={handleNextFrameCytoData}
      updatePrevFrameCytoData={handlePrevFrameCytoData}
      containerRef={currRef}
    />
  );

  return (
    <BFSWrapper>
      <SplitPane
        className="bfs-worksheet"
        split="vertical"
        defaultSize="65%"
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
            queue={queue}
            visited={visited}
          />
          <GraphInfo
            containerRef={currRef}
            source={graphStr}
            errors={errors}
            handleSourceChange={(source: string) => {
              handleReset(
                graphStr,
                queue,
                updateQueue,
                visited,
                updateVisited,
                cytoData,
                updateCytoData,
              );
              setGraphStr(parseSource(source));
            }}
            handleCytoChange={(ref: RefObject<HTMLDivElement>) => {
              ref && useCytoscape(cytoData, ref);
            }}
          />
        </SplitPane>
        <BFSCommentary />
      </SplitPane>
    </BFSWrapper>
  );
};
export default BFS;
