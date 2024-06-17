/* eslint-disable react-hooks/exhaustive-deps */
import { useNodes } from 'reactflow';
import { CustomNodeTypes } from '../../reactFlow/nodes';
import { useMemo } from 'react';
import { MoveLeft } from 'lucide-react';
import clsx from 'clsx';
import SendMessageEditor from '../../reactFlow/nodes/SendMessage/NodeEditor';
import { useNodesContext } from '../../../contexts/reactFlowContext/useNodeContext';

type NodeData = {
    message: string;
    label?: string;
};

const NodeEditorViewer = () => {
    const { setNodes } = useNodesContext();
    const nodes = useNodes<NodeData>();
    const selectedNode = nodes.find((node) => node.selected);
    const { id } = selectedNode || {};

    if (selectedNode && !id) {
        throw new Error('Selected Node id not editable');
    }

    const SelectedNodeSettingComponent = useMemo(() => {
        switch (selectedNode?.type) {
            case CustomNodeTypes.SendMessage:
                return SendMessageEditor;

            default:
                return null;
        }
    }, [id]);

    const settingsDrawerClasses = clsx(
        'transition-transform absolute bg-neutral-50 w-full h-full duration-300',
        {
            'translate-x-0': !!SelectedNodeSettingComponent,
            'translate-x-full': !SelectedNodeSettingComponent,
        },
    );

    const removeSelected = () => {
        console.log('removeSelected');
        setNodes((prev) =>
            prev.map((n) => (n.selected ? { ...n, selected: false } : n)),
        );
    };

    return (
        <div className={settingsDrawerClasses}>
            {!!SelectedNodeSettingComponent && (
                <>
                    <div className="flex gap-4 py-4 border-b px-2 duration-300">
                        <button onClick={removeSelected}>
                            <MoveLeft />
                        </button>
                        <span className="uppercase">
                            {selectedNode?.data?.label || 'Node Settings'}
                        </span>
                    </div>
                    <div className="px-2">
                        <SelectedNodeSettingComponent node={selectedNode!} />
                    </div>
                </>
            )}
        </div>
    );
};

export default NodeEditorViewer;
