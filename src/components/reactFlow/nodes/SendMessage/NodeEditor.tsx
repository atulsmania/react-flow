import { ChangeEvent, useCallback, useState } from 'react';
import { Node } from 'reactflow';
import { useNodesContext } from '../../../../contexts/reactFlowContext/useNodeContext';
import { SendMessageNodeData } from '.';

type SendMessageEditorProps = {
    node: Node<SendMessageNodeData>;
};

const SendMessageEditor = ({ node }: SendMessageEditorProps) => {
    const { data } = node;
    const [message, setMessage] = useState<string>(data.message);
    const { setNodes } = useNodesContext();

    const onChange = useCallback((evt: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = evt.target;
        setMessage(value);
    }, []);

    const handleSave = () => {
        setNodes((nds) =>
            nds.map((n) =>
                n.id === node.id ? { ...n, data: { message } } : n,
            ),
        );
    };

    return (
        <div className="max-w-96 flex flex-col gap-2 mt-2">
            <label className="text-lg">Text: </label>
            <textarea
                value={message}
                onChange={onChange}
                className="w-full p-2 resize-none border-2"
                rows={5}
            />
            <button
                onClick={handleSave}
                className="border-2 border-neutral-950 rounded px-2 py-1"
            >
                Save
            </button>
        </div>
    );
};

export default SendMessageEditor;
