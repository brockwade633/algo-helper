export const GRAPHDEFINITION = `
  Graph {
    meta: Meta;
    adjacencyList: Node[];
  }

  Meta {
    title: string;
    author?: string;
  }

  Node {
    id: number;
    value: string;
    neighbors: number[];
  }
`;
