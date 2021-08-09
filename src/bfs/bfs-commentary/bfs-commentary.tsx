import React from 'react';
import { Box, Markdown } from 'grommet';

const BFSCommentary = (): JSX.Element => {
  return (
    <Box pad="medium" width="100%">
      <Box
        className="bfs-commentary"
        width="100%"
        pad="small"
        round="small"
        elevation="large"
      >
        <Markdown>{`## Breadth First Search\n\n Breadth First Search, or BFS, is a common graph traversal or searching algorithm.`}</Markdown>
      </Box>
    </Box>
  );
};
export default BFSCommentary;
