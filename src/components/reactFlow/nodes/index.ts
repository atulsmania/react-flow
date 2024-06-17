import type { Node, NodeTypes } from 'reactflow';
import SendMessage from './SendMessage';

export enum CustomNodeTypes {
    SendMessage = 'send-message',
}

export const initialNodes: Node[] = [
    {
        id: 'a',
        type: CustomNodeTypes.SendMessage,
        position: { x: 0, y: 0 },
        data: { label: 'send message', message: 'Test Message 1' },
    },
    {
        type: CustomNodeTypes.SendMessage,
        id: 'b',
        position: { x: 200, y: 100 },
        data: { label: 'send message', message: 'Test Message 2' },
    },
    {
        id: 'c',
        type: CustomNodeTypes.SendMessage,
        position: { x: 200, y: -100 },
        data: { label: 'send message', message: 'Test Message 3' },
    },
    {
        id: 'd',
        type: CustomNodeTypes.SendMessage,
        position: { x: 400, y: 100 },
        data: { label: 'send message', message: 'Test Message 4' },
    },
];

export const nodeTypes: NodeTypes = {
    [CustomNodeTypes.SendMessage]: SendMessage,
    // Add any of your custom nodes here!
};
