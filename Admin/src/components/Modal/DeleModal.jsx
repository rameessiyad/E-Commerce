import React, { useState } from "react";
import {
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
} from "tw-elements-react";

export default function DeleteModal({ handleDeleteProduct }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            {/* Button trigger modal */}
            <button
                type="button"
                className="text-red-500 text-2xl underline font-medium cursor-pointer"
                onClick={() => setShowModal(true)}
            >
                Remove Product
            </button>

            {/* Modal */}
            <TEModal
                show={showModal}
                setShow={setShowModal}
                className="fixed inset-0 z-50 flex items-center justify-center"
            >
                <div
                    className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${showModal ? 'opacity-50' : 'opacity-0'}`}
                    onClick={() => setShowModal(false)}
                ></div>
                <TEModalDialog className={`relative z-50 transform transition-transform duration-300 ${showModal ? 'scale-100' : 'scale-90'}`}>
                    <TEModalContent className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out">
                        <TEModalHeader>
                            <h5 className="text-lg font-medium leading-normal text-slate-600">
                                Delete Product
                            </h5>
                            <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </TEModalHeader>
                        <TEModalBody>
                            Are you sure , you want to delete this product
                        </TEModalBody>
                        <TEModalFooter className="flex  items-center justify-end">
                            <button
                                type="button"
                                className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition-transform duration-300 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="ml-1 inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition-transform duration-300 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                onClick={handleDeleteProduct}
                            >
                                Delete
                            </button>
                        </TEModalFooter>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
        </div>
    );
}
