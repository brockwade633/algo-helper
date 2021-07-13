import React, { useState } from 'react';
import { ErrorObject } from 'ajv';
import { GraphSchema } from '../schemas';
import { useCytoscape } from '../../common';
import { GraphSourceProps } from './';

const GraphSource = (props: GraphSourceProps): JSX.Element => {
  const parentRef = props.containerRef;
  const defaultGraph = props.default;
  const cytoTransform = props.transform;
  const validate = props.validate;

  const [text, setText] = useState(JSON.stringify(defaultGraph, undefined, 2));
  const [errors, setErrors] = useState<
    ErrorObject<string, Record<string, any>, unknown>[]
  >([]);
  const [cytoData, setCytoData] = useState<
    cytoscape.ElementDefinition[] | undefined
  >(cytoTransform(defaultGraph));

  const parseSource = (sourceText: string) => {
    try {
      const sourceJson = JSON.parse(sourceText);
      const errs = validate(sourceJson, GraphSchema);
      if (errs) {
        setErrors(errs);
      } else {
        setCytoData(cytoTransform(sourceJson));
        setErrors([]);
      }
      const prettyText = JSON.stringify(sourceJson, undefined, 2);
      return prettyText;
    } catch (err) {
      setErrors([err]);
      return sourceText;
    }
  };

  if (parentRef) {
    useCytoscape(cytoData, parentRef);
  }

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
        value={text}
        className={errors.length > 0 ? 'error' : 'good'}
        onChange={(e) => setText(parseSource(e.target.value))}
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
