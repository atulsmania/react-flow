import { useContext } from 'react';
import { NodesContext } from '.';

export const useNodesContext = () => {
    const nodesContext = useContext(NodesContext);
    if (!Object.keys(nodesContext).length) {
        throw new Error('useNodesContext must be used within a NodesProvider');
    }
    return nodesContext;
};
