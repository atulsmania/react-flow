import type { Edge, EdgeTypes } from 'reactflow';

export const initialEdges: Edge[] = [
    { id: 'a->c', source: 'a', target: 'c' },
    { id: 'c->b', source: 'c', target: 'b' },
    { id: 'b->d', source: 'b', target: 'd' },
];

export const edgeTypes: EdgeTypes = {
    // Add your custom edge types here!
};
