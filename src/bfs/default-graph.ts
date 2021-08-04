export const defaultBFS = {
  meta: {
    title: 'BFS',
  },
  rootId: 1,
  adjacencyList: [
    {
      id: 1,
      value: '1',
      neighbors: [2, 3],
    },
    {
      id: 2,
      value: '2',
      neighbors: [],
    },
    {
      id: 3,
      value: '3',
      neighbors: [4, 5],
    },
    {
      id: 4,
      value: '4',
      neighbors: [3, 5],
    },
    {
      id: 5,
      value: '5',
      neighbors: [],
    },
  ],
};
