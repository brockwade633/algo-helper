import React from 'react';
import { GraphSource } from './';
import { GraphDefinition } from './';
import { GraphInfoProps } from './';

const GraphInfo = (props: GraphInfoProps): JSX.Element => {
  const parentRef = props.containerRef;
  const source = props.source;
  const errors = props.errors;
  const handleSourceChange = props.handleSourceChange;
  const handleCytoChange = props.handleCytoChange;

  handleCytoChange(parentRef);

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <GraphSource
        {...{
          source: source,
          errors: errors,
          handleSourceChange: handleSourceChange,
        }}
      />
      <GraphDefinition />
    </div>
  );
};
export default GraphInfo;
