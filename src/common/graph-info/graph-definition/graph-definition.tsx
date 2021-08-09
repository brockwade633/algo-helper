import React from 'react';
import { Box, Text } from 'grommet';
import { Notes } from 'grommet-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
//import { foundation } from 'react-syntax-highlighter/dist/esm/styles/hljs/';
import { DEFAULTGRAPHDEFINITION } from './';

const GraphDefinition = (): JSX.Element => {
  return (
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
        pad="xsmall"
        elevation="large"
        background="rgb(30, 30, 30)"
        round="small"
      >
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
          customStyle={{ padding: '0px' }}
          children={DEFAULTGRAPHDEFINITION}
        />
      </Box>
      <Box pad="small">
        <Text size="small" weight="bold">
          ** "neighbors" array references other node ids **
        </Text>
      </Box>
    </Box>
  );
};
export default GraphDefinition;
