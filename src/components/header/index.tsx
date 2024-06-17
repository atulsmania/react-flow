import { validators } from '../../constants/reactFlow';
import { useNodesContext } from '../../contexts/reactFlowContext/useNodeContext';
import { useSnackbar } from '../../contexts/snackbar/useSnackbar';

const Header = () => {
    const { showSnackbar } = useSnackbar();
    const { nodes, edges, nodeChanged, setNodeChanged } = useNodesContext();

    const handleSaveFlow = () => {
        const isFlowValid = validators.isFlowValid(nodes, edges);

        if (!isFlowValid) {
            showSnackbar(
                `Cannot save. Every node must have at least one target.`,
                'error',
            );
            return;
        }

        setNodeChanged(false);
        showSnackbar('Flow saved successfully', 'success');
    };

    return (
        <header className="bg-white shadow p-4 flex justify-between z-50">
            <div>
                <h1 className="text-2xl font-semibold">Chatbot Flow Builder</h1>
            </div>
            <div>
                {nodeChanged && (
                    <button
                        onClick={handleSaveFlow}
                        className="border-2 border-neutral-950 text-sm rounded px-2 py-1"
                    >
                        Save Changes
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
