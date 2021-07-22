import React from 'react';
import { Box, Text } from 'grommet';
import { StatusGood, StatusWarning, Code, Notes } from 'grommet-icons';
import Editor from '@monaco-editor/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
//import { foundation } from 'react-syntax-highlighter/dist/esm/styles/hljs/';
import { GraphSourceProps, GRAPHDEFINITION } from './';

const GraphSource = (props: GraphSourceProps): JSX.Element => {
  const parentRef = props.containerRef;
  const source = props.source;
  const errors = props.errors;
  const handleSourceChange = props.handleSourceChange;
  const handleCytoChange = props.handleCytoChange;

  handleCytoChange(parentRef);

  return (
    <div style={{ display: 'flex', width: '100%' }}>
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
          height="100%"
          pad="small"
          round="small"
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
          <Text size="small" color={errors.length ? 'red' : 'green'}>
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
      <Box pad="small" height="100%" width="50%">
        <Box>
          <Text size="small" margin="small" weight="bold">
            <div style={{ display: 'flex' }}>
              <Notes size="18px" color="black" />
              &nbsp;Graph Definition
            </div>
          </Text>
        </Box>
        <Box
          height="100%"
          pad="small"
          background="rgb(30, 30, 30)"
          round="small"
        >
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            customStyle={{ padding: '0px' }}
            children={GRAPHDEFINITION}
          />
        </Box>
        <Box pad="small">
          <Text size="small" weight="bold">
            *Note: "neighbors" array references other node ids
          </Text>
        </Box>
      </Box>
    </div>
  );
};
export default GraphSource;
