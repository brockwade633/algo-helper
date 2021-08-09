import React from 'react';
import { Box, Text } from 'grommet';
import { Code, StatusGood, StatusWarning } from 'grommet-icons';
import Editor from '@monaco-editor/react';
import { GraphSourceProps } from './';

const GraphSource = (props: GraphSourceProps): JSX.Element => {
  const source = props.source;
  const errors = props.errors;
  const handleSourceChange = props.handleSourceChange;

  return (
    <Box pad="small" height="100%" width="50%">
      <Box>
        <Text size="small" margin="small" weight="bold">
          <div style={{ display: 'flex' }}>
            <Code size="18px" color="black" />
            &nbsp;Graph Source
          </div>
        </Text>
      </Box>
      <Box
        className="graph-source"
        height="100%"
        pad="small"
        round="small"
        elevation="large"
        border={{
          color: `${errors.length ? 'red' : 'green'}`,
          size: 'small',
          style: 'solid',
          side: 'all',
        }}
      >
        <Editor
          height="100%"
          defaultLanguage="json"
          defaultValue={source}
          onChange={(val) => handleSourceChange(val)}
        />
      </Box>
      <Box pad="small">
        <Text
          size="small"
          weight="bold"
          color={errors.length ? 'red' : 'green'}
        >
          {errors.length ? (
            errors.map((err) =>
              err.instancePath ? (
                <div key={errors.indexOf(err)} style={{ display: 'flex' }}>
                  <StatusWarning color="red" size="18px" />
                  &nbsp;{`Error: ${err.message} at ${err.instancePath}`}
                </div>
              ) : (
                <div key={errors.indexOf(err)} style={{ display: 'flex' }}>
                  <StatusWarning color="red" size="18px" />
                  &nbsp;{`Error: ${err.message}`}
                </div>
              ),
            )
          ) : (
            <div style={{ display: 'flex' }}>
              <StatusGood color="green" size="18px" />
              &nbsp;Valid JSON
            </div>
          )}
        </Text>
      </Box>
    </Box>
  );
};
export default GraphSource;
