export const DEFAULTGRAPHDEFINITION = `
  Graph {
    rootId: Number;
    adjacencyList: Node[];
  }

  Node {
    id: Number;
    value: String;
    neighbors: Number[];
  }
`;
