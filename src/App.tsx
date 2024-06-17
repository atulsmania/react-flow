import Header from './components/header';
import ReactFlow from './components/reactFlow';
import SidePanel from './components/sidePanel';
import { NodesStateProvider } from './contexts/reactFlowContext';
import { SnackbarProvider } from './contexts/snackbar';

export default function App() {
    return (
        <SnackbarProvider>
            <NodesStateProvider>
                <main className="flex w-full h-full flex-col">
                    <Header />
                    <div className="flex-1 flex w-full h-full">
                        <ReactFlow />
                        <SidePanel />
                    </div>
                </main>
            </NodesStateProvider>
        </SnackbarProvider>
    );
}
