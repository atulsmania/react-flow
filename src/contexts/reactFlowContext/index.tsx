import React, { PropsWithChildren, useRef, useState } from 'react';
import {
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
    NodeChange,
    EdgeChange,
    ReactFlowInstance,
} from 'reactflow';

import 'reactflow/dist/style.css';

import { initialNodes } from '../../components/reactFlow/nodes';
import { initialEdges } from '../../components/reactFlow/edges';

type NodeState = ReturnType<typeof useNodesState>;
type EdgeState = ReturnType<typeof useEdgesState>;

type NodesContextType = {
    nodes: NodeState[0];
    setNodes: NodeState[1];
    onNodesChange: NodeState[2];
    edges: EdgeState[0];
    setEdges: EdgeState[1];
    onEdgesChange: EdgeState[2];
    nodeChanged: boolean;
    setNodeChanged: React.Dispatch<React.SetStateAction<boolean>>;
    reactFlowInstance: ReactFlowInstance | null;
    setReactFlowInstance: React.Dispatch<
        React.SetStateAction<ReactFlowInstance | null>
    >;
    reactFlowWrapper: React.RefObject<HTMLDivElement>;
};
export const NodesContext = React.createContext({} as NodesContextType);

export const NodesStateProvider = ({ children }: PropsWithChildren) => {
    const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
    const [reactFlowInstance, setReactFlowInstance] =
        useState<ReactFlowInstance | null>(null);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeChanged, setNodeChanged] = React.useState(false);

    const nodeChangedHandler = (changes: NodeChange[]) => {
        onNodesChange(changes);

        // logic to check if flow updated
        if (!reactFlowInstance) return; // avoid running before initialization
        const firstChange = changes[0];
        if (firstChange.type === 'select') return;
        if (firstChange.type === 'position' && !firstChange.dragging) return;
        setNodeChanged(true);
    };

    const edgeChangedHandler = (changes: EdgeChange[]) => {
        onEdgesChange(changes);

        // logic to check if edges flow updated
        if (!reactFlowInstance) return; // avoid running before initialization
        const firstChange = changes[0];
        if (firstChange.type === 'select') return;
        setNodeChanged(true);
    };

    return (
        <ReactFlowProvider>
            <NodesContext.Provider
                value={{
                    nodes,
                    setNodes,
                    edges,
                    setEdges,
                    onNodesChange: nodeChangedHandler,
                    onEdgesChange: edgeChangedHandler,
                    nodeChanged,
                    setNodeChanged,
                    reactFlowInstance,
                    setReactFlowInstance,
                    reactFlowWrapper,
                }}
            >
                {children}
            </NodesContext.Provider>
        </ReactFlowProvider>
    );
};
