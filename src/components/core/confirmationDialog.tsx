import React from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks';
import { RootState } from '@/src/store';
import { closeConfirmation } from '@/src/reducers/confirmationSlice';

const ConfirmationDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
  } = useAppSelector((state: RootState) => state.rootReducer.confirmation);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    dispatch(closeConfirmation());
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    dispatch(closeConfirmation());
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;