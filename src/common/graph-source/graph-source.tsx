import React, { useState } from 'react';
import { ErrorObject } from 'ajv';
import { GraphSchema } from '../schemas';
import { useCytoscape } from '../../common';
import { GraphSourceProps } from './';

const GraphSource = (props: GraphSourceProps): JSX.Element => {
  const parentRef = props.containerRef;
  const source = props.source;
  const errors = props.errors;
  const handleSourceChange = props.handleSourceChange;
  const handleCytoChange = props.handleCytoChange;

  handleCytoChange(parentRef);

  return (
    <div style={{ width: '100%' }}>
      <textarea
        id="graph-data"
        name="graph-data"
        style={{
          width: '100%',
          height: '80%',
          boxSizing: 'border-box',
          resize: 'none',
        }}
        value={source}
        className={errors.length > 0 ? 'error' : 'good'}
        onChange={(e) => handleSourceChange(e.target.value)}
      />
      <div style={{ height: '20%' }}>
        {errors &&
          errors.map((err) => (
            <div className="validation-errors" key={errors.indexOf(err)}>
              <p className="error-message" key={errors.indexOf(err)}>
                {err.instancePath
                  ? `Error: ${err.message} at ${err.instancePath}`
                  : `Error: ${err.message}`}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
export default GraphSource;
