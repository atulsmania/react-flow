import { Connection, Edge, Node } from 'reactflow';
import { CustomNodeTypes } from '../components/reactFlow/nodes';
import { MessageCircleMore } from 'lucide-react';

export const validators = {
    isSourceUnique: (edges: Edge[], connection: Connection) => {
        // check if source has no other connections
        return edges.find((e) => e.source === connection.source) === undefined;
    },
    isTargetUnique: (edges: Edge[], connection: Connection) => {
        // check if target has no other connections
        return edges.find((e) => e.target === connection.target) === undefined;
    },
    isFlowValid: (nodes: Node[], edges: Edge[]) => {
        const maxAllowedEmptyTargetNodes = 1;
        let totalEdgesToTarget = 0;
        const nodeTargetCountMap = new Map();

        nodes.forEach((node) => {
            nodeTargetCountMap.set(node.id, { totalTarget: 0, totalSource: 0 });
        });

        edges.forEach((edge) => {
            nodeTargetCountMap.get(edge.target).totalTarget += 1;
            nodeTargetCountMap.get(edge.source).totalSource += 1;
        });

        nodeTargetCountMap.forEach((node) => {
            if (node.totalTarget === 0) {
                totalEdgesToTarget += 1;
            }
        });

        return totalEdgesToTarget <= maxAllowedEmptyTargetNodes;
    },
};

export const draggableNodeList = [
    {
        type: CustomNodeTypes.SendMessage,
        label: 'Message',
        icon: MessageCircleMore,
    },
];
