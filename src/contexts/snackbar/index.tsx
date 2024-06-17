import { createContext, useState, useCallback, PropsWithChildren } from 'react';
import Toast from './Toast';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

interface SnackbarContextType {
    showSnackbar: (message: string, type: ToastType) => void;
}

export const SnackbarContext = createContext({} as SnackbarContextType);

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
    const [snackbar, setSnackbar] = useState<{
        message: string;
        type: ToastType;
        isOpen: boolean;
    }>({ message: '', type: 'info', isOpen: false });

    const showSnackbar = useCallback(
        (message: string, type: ToastType) => {
            setSnackbar({ message, type, isOpen: true });
            setTimeout(() => {
                setSnackbar({ ...snackbar, isOpen: false });
            }, 4000);
        },
        [snackbar],
    );

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            {snackbar.isOpen && (
                <Toast message={snackbar.message} type={snackbar.type} />
            )}
        </SnackbarContext.Provider>
    );
};
