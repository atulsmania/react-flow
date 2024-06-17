import clsx from 'clsx';
import { ToastType } from '.';

interface ToastProps {
    message: string;
    type: ToastType;
}

const Toast = ({ message, type }: ToastProps) => {
    return (
        <div
            className={clsx(
                `fixed top-4 left-1/2 z-50 transform -translate-x-1/2 px-4 py-2 rounded text-white`,
                {
                    'bg-blue-500': type === 'info',
                    'bg-green-500': type === 'success',
                    'bg-yellow-500': type === 'warning',
                    'bg-red-500': type === 'error',
                },
            )}
        >
            {message}
        </div>
    );
};

export default Toast;
