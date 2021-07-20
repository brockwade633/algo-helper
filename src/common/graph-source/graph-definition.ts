export const GRAPHDEFINITION = `
  Graph {
    meta: Meta;
    adjacencyList: Node[];
  }

  Meta {
    title: String;
    author?: String;
  }

  Node {
    id: Number;
    value: String;
    neighbors: Number[];
  }
`;
