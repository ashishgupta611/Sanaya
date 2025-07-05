import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AppDispatch } from '../store';
import { openConfirmation } from '../reducers/confirmationSlice';
import { ConfirmationProps } from "../types/interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const confirm = (dispatch: AppDispatch, options: ConfirmationProps) => {
  dispatch(openConfirmation({
    title: options.title || 'Are you sure?',
    message: options.message,
    // onConfirm: options.onConfirm,
    // onCancel: options.onCancel,
    confirmText: options.confirmText || 'Confirm',
    cancelText: options.cancelText || 'Cancel',
  }));
};
