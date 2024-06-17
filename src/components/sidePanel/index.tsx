import DraggableNodeList from './draggableNodeList';
import NodeEditorViewer from './nodeEditorViewer';

const SidePanel = () => {
    return (
        <div className="min-w-96 h-full shadow relative">
            <NodeEditorViewer />
            <DraggableNodeList />
        </div>
    );
};

export default SidePanel;
