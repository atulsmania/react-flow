import { Connection, Handle, NodeProps, Position, useEdges } from 'reactflow';
import { validators } from '../../../../constants/reactFlow';

export type SendMessageNodeData = {
    message: string;
    label?: string;
};

const SendMessage = (props: NodeProps<SendMessageNodeData>) => {
    const edges = useEdges();
    const { data } = props;

    const isConnectionValid = (connection: Connection) => {
        return validators.isSourceUnique(edges, connection);
    };

    return (
        <div className="react-flow__node-default p-0">
            <Handle
                type="source"
                position={Position.Right}
                isValidConnection={isConnectionValid}
            />
            <div className="max-w-96 flex flex-col text-start">
                <label className="bg-slate-100 text-left px-2 py-1">
                    Send Message
                </label>
                <p className="font-extralight text-xs p-2">{data.message}</p>
            </div>
            <Handle type="target" position={Position.Left} />
        </div>
    );
};

export default SendMessage;
