import React, { useRef, useState, useEffect, RefObject } from 'react';
import SplitPane from 'react-split-pane';
import { GraphAnimation } from '../common';
import {
  BFSWrapper,
  cytoBFSTransform,
  defaultBFS,
  defaultBFSCytoCore,
} from './';
import { GraphSource } from '../common';
import { validateGraph } from '../common';
import { ErrorObject } from 'ajv';
import { GraphSchema } from '../common/schemas';
import cytoscape from 'cytoscape';
import { useCytoscape } from '../common';

const BFS = (): JSX.Element => {
  const currRef = useRef<HTMLDivElement>(null);
  const [isGraphAnimationRendered, setIsGraphAnimationRendered] =
    useState(false);

  const [text, setText] = useState(JSON.stringify(defaultBFS, undefined, 2));
  const [errors, setErrors] = useState<
    ErrorObject<string, Record<string, any>, unknown>[]
  >([]);
  const [cytoData, setCytoData] = useState<
    cytoscape.ElementDefinition[] | undefined
  >(cytoBFSTransform(defaultBFS));

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

  // How are we going to initialize a cyto core object that we can pass to splitpane onChange?
  //
  //   const defaultCore = (check: boolean) => {
  //     if (check) {
  //         return defaultBFSCytoCore(currRef, cytoData);
  //     }
  //   };

  //   const [cytoCore, setCytoCore] = useState(null);

  const handleBFSGraphSourceChange = (source: string) => {
    setText(parseSource(source));
  };

  const handleBFSCytoChange = (ref: RefObject<HTMLDivElement>) => {
    if (ref) {
      useCytoscape(cytoData, ref);
    }
  };

  return (
    <BFSWrapper>
      <SplitPane
        split="vertical"
        defaultSize="70%"
        onChange={() => {
          console.log();
        }}
      >
        <SplitPane split="horizontal" defaultSize="50%">
          <GraphAnimation
            {...{
              containerRef: currRef,
              isRendered: setIsGraphAnimationRendered,
            }}
          />
          <GraphSource
            {...{
              containerRef: currRef,
              source: text,
              errors: errors,
              handleSourceChange: handleBFSGraphSourceChange,
              handleCytoChange: handleBFSCytoChange,
            }}
          />
        </SplitPane>
        <div>HELLO WORLD</div>
      </SplitPane>
    </BFSWrapper>
  );
};
export default BFS;
