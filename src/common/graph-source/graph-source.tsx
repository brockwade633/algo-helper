import React from 'react';
import { Box, Text, TextArea } from 'grommet';
import { StatusGood, StatusWarning, Code, Notes } from 'grommet-icons';
import { GraphSourceProps } from './';

const GraphSource = (props: GraphSourceProps): JSX.Element => {
  const parentRef = props.containerRef;
  const source = props.source;
  const errors = props.errors;
  const handleSourceChange = props.handleSourceChange;
  const handleCytoChange = props.handleCytoChange;

  handleCytoChange(parentRef);

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Box pad="small" height="100%" width="60%">
        <Box>
          <Text size="small" margin="small" weight="bold">
            <div style={{ display: 'flex' }}>
              <Code size="18px" color="black" />
              &nbsp;Graph Source
            </div>
          </Text>
        </Box>
        <Box
          height="100%"
          pad="xxsmall"
          round="small"
          border={{
            color: `${errors.length ? 'red' : 'green'}`,
            size: 'small',
            style: 'solid',
            side: 'all',
          }}
        >
          <TextArea
            fill
            plain
            focusIndicator={false}
            resize={false}
            id="graph-data"
            name="graph-data"
            size="small"
            value={source}
            className={errors.length > 0 ? 'error' : 'good'}
            onChange={(e) => handleSourceChange(e.target.value)}
          />
        </Box>
        <Box pad="small">
          <Text size="small" color={errors.length ? 'red' : 'green'}>
            {errors.length ? (
              errors.map((err) =>
                err.instancePath ? (
                  <div style={{ display: 'flex' }}>
                    <StatusWarning color="red" size="18px" />
                    &nbsp;{`Error: ${err.message} at ${err.instancePath}`}
                  </div>
                ) : (
                  <div style={{ display: 'flex' }}>
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
      <Box pad="small" height="100%" width="40%">
        <Box>
          <Text size="small" margin="small" weight="bold">
            <div style={{ display: 'flex' }}>
              <Notes size="18px" color="black" />
              &nbsp;Graph Definition
            </div>
          </Text>
        </Box>
        <Box height="100%" pad="small" round="small">
          Hello World
        </Box>
      </Box>
    </div>
  );
};
export default GraphSource;
