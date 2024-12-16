import React, { useState, useEffect } from 'react';
import { ActionTypes } from '@/types';
import useToastStore from '@/store/toastStore';

interface IToastProps {
    action: ActionTypes,
    errorMessage?: string
}

const Toast: React.FC<IToastProps> = ({ action, errorMessage }) => {
    const { setShowToast, showToast } = useToastStore()


    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    let content = '';
    if (action === ActionTypes.CREATED) {
        content = 'User Created Successfully';
    } else if (action === ActionTypes.UPDATED) {
        content = 'User Updated Successfully';
    } else if (action === ActionTypes.DELETED) {
        content = 'User Deleted Successfully';
    } else if (action === ActionTypes.ERROR) {
        content = errorMessage || 'Something Went Wrong';
    }

    if (showToast) {
        return (
            <>
                {
                    (action === ActionTypes.CREATED) || (action === ActionTypes.DELETED) || (action === ActionTypes.UPDATED) ?
                        <div id="toast-success"
                             className="fixed top-4 right-4 z-50 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                             role="alert">
                            <div
                                className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-red-800 dark:text-red-200'>
                                <svg className='w-5 h-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg'
                                     fill='currentColor' viewBox='0 0 20 20'>
                                    <path
                                        d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z'/>
                                </svg>
                            </div>
                            <div className='ml-3 text-sm font-normal'>{ content }.</div>
                            <button type='button'
                                    onClick={ () => setShowToast(false) }
                                    className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 items-center justify-center dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                                    data-dismiss-target="#toast-danger" aria-label="Close">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor"
                                     viewBox="0 0 14 14">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                        :
                        <div id="toast-danger"
                             className="fixed top-4 right-4 z-50 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                             role="alert">
                            <div
                                className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                                </svg>
                            </div>
                            <div className="ml-3 text-sm font-normal">{ content }.</div>
                            <button type="button"
                                    onClick={ () => setShowToast(false) }
                                    className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 items-center justify-center dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                                    data-dismiss-target="#toast-danger" aria-label="Close">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor"
                                     viewBox="0 0 14 14">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                }
            </>
        );
    } else {
        return <> </>;
    }
};

export default Toast;
