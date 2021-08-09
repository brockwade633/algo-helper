import React from 'react';
import { Box, Text } from 'grommet';
import { ListViewPanelProps } from './';

const ListViewPanel = (props: ListViewPanelProps): JSX.Element => {
  const data = props.data;
  const label = props.label;
  const containerHeight = props.height;
  return (
    <Box pad={{ bottom: 'small' }} height={containerHeight}>
      <Box
        className="algo-panel"
        pad="small"
        round="small"
        height="100%"
        elevation="large"
      >
        <Text size="large" weight="bold">
          {label}
        </Text>
        <Text size="large">{data.map((item) => `${item} `)}</Text>
      </Box>
    </Box>
  );
};
export default ListViewPanel;
