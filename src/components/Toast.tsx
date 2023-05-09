import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { ToastInterface } from '../hooks/useToast';

export interface ToastProps {
  toast: ToastInterface | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, toast?.duration);
    return () => clearTimeout(timer);
  }, [onClose, toast?.duration]);

  if (!toast) return null;

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:items-start sm:p-6"
      >
        <div className="flex flex-col items-center w-full space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={!!toast}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="w-full max-w-sm overflow-hidden bg-gray-900 rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {toast.status === 'success' ? (
                      <CheckCircleIcon
                        className="w-6 h-6 text-green-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <XCircleIcon
                        className="w-6 h-6 text-red-600"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-300">{toast.title}</p>
                    <p className="mt-1 text-sm text-gray-400 first-letter:uppercase">{toast.description}</p>
                  </div>
                  {toast.isClosable ? (
                    <div className="flex flex-shrink-0 ml-4">
                      <button
                        type="button"
                        className="inline-flex text-gray-400 bg-gray-900 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};
