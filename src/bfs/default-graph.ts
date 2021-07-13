export const defaultBFS = {
  nodes: [
    {
      id: 1,
      value: '1',
    },
    {
      id: 2,
      value: '2',
    },
    {
      id: 3,
      value: '3',
    },
    {
      id: 4,
      value: '4',
    },
    {
      id: 5,
      value: '5',
    },
  ],
  edges: [
    {
      from: 1,
      to: 2,
    },
    {
      from: 1,
      to: 3,
    },
    {
      from: 3,
      to: 4,
    },
    {
      from: 3,
      to: 5,
    },
    {
      from: 4,
      to: 5,
    },
    {
      from: 4,
      to: 3,
    },
  ],
};
