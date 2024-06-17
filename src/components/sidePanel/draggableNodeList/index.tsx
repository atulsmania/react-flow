import clsx from 'clsx';
import { draggableNodeList } from '../../../constants/reactFlow';

export const dataTransferFormat = 'reactFlow-nodeType';

const DraggableNodeList = () => {
    return (
        <div className="w-full grid grid-cols-2 p-2 gap-4">
            {draggableNodeList.map((node, idx) => (
                <ListItem key={idx} node={node} />
            ))}
        </div>
    );
};

const ListItem = ({ node }: { node: (typeof draggableNodeList)[number] }) => {
    const { icon: Icon, label } = node;

    const setTransferData = (e: React.DragEvent) => {
        e.dataTransfer.setData(dataTransferFormat, node.type);
    };

    return (
        <div
            draggable
            onDragStart={setTransferData}
            className={clsx(
                'px-6 py-4 gap-2 flex flex-col items-center border-2 rounded',
                'h-fit hover:border-neutral-950 cursor-grab bg-neutral-50',
            )}
        >
            <Icon color="black" />
            <span className="text-sm">{label}</span>
        </div>
    );
};

export default DraggableNodeList;
