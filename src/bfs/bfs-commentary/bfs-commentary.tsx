import React from 'react';
import { Box, Text } from 'grommet';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { foundation } from 'react-syntax-highlighter/dist/esm/styles/hljs/';

const renderers = {
  // eslint-disable-next-line react/prop-types
  code: ({ language, value }) => {
    const { showLineNumbers, codeStyle } =
      language === 'bash'
        ? { showLineNumbers: false, codeStyle: foundation }
        : { showLineNumbers: true, codeStyle: vscDarkPlus };

    return (
      <SyntaxHighlighter
        style={codeStyle}
        language={language}
        showLineNumbers={showLineNumbers}
        // eslint-disable-next-line react/no-children-prop
        children={value}
      />
    );
  },
};

const BFSCommentary = (): JSX.Element => {
  const CONTENT = `---
  **Breadth First Search**, or **BFS**, is a common graph traversal and/or searching algorithm.\n
  Starting from a single node, **BFS** traverses the graph by repeatedly exploring each neighbor of the current node.
  Once a neighbor is explored, it is placed onto a **queue** so that in a future iteration, *its* neighbors may be searched.\n
  Once all the neighboring nodes of the current node have been explored, the node is said to be **visited**, and marked as such
  via membership in a **visited** list. Then, the next node in the **queue** is popped off and the next iteration begins. 
  In the animation to the left, the **visited** nodes are colored **orange**, while **un-visited** nodes that have been stored in the **queue** 
  for future iterations are colored **blue**.\n
  **Python implementation:**\n
  \`\`\`bash
  from collections import deque

  bfs_traversal(source_node):
    queue = deque([source_node])
    visited = []
    while queue:
      node = queue.pop()
      for neighbor in node.neighbors:
        if neighbor not in visited:
          queue.appendleft(neighbor)
      visited.append(node)
  \`\`\` 
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
        <ReactMarkdown renderers={renderers}>{CONTENT}</ReactMarkdown>
      </Box>
    </Box>
  );
};
export default BFSCommentary;
