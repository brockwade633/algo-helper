import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Text } from 'grommet';

const BFSCommentary = (): JSX.Element => {
  const CONTENT = `---
  **Breadth First Search**, or **BFS**, is a common graph traversal and/or searching algorithm.\n
  Starting from a single node, **BFS** traverses the graph by repeatedly exploring each neighbor of the current node.
  Once a neighbor is explored, it is placed onto a **queue** so that in a future iteration, *its* neighbors may be searched.\n
  Once all the neighboring nodes of the current node have been explored, the node is said to be **visited**, and marked as such
  via membership in a **visited** list. Then, the next node in the **queue** is popped off and the next iteration begins. 
  In the animation to the left, the **visited** nodes are colored **orange**, while **un-visited** nodes that have been stored in the **queue** 
  for future iterations are colored **blue**. 
  `;
  return (
    <Box pad="medium" width="100%">
      <Box
        className="bfs-commentary"
        width="100%"
        pad="small"
        round="small"
        elevation="large"
      >
        <Text size="xxlarge" weight="bold" alignSelf="center">
          Breadth First Search
        </Text>
        <ReactMarkdown children={CONTENT} />
      </Box>
    </Box>
  );
};
export default BFSCommentary;
