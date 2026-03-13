import { Send, XCircle, Loader2 } from 'lucide-react';
import React from 'react';

const RejectionModal = ({ rejectionModalRef, rejectionReason, setRejectionReason, handleReject, filename, isRejecting }) => {

    return (
        <dialog ref={rejectionModalRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-white dark:bg-slate-800 border-t-4 border-red-500">
                <h3 className="font-bold text-xl flex items-center gap-2 text-red-600">
                    <XCircle size={24} /> Reject File
                </h3>
                <p className="py-4 text-slate-600 dark:text-slate-300">
                    Please provide a specific reason for rejecting <strong>{filename}</strong>. This will be sent back to the designer.
                </p>

                <textarea
                    className="textarea textarea-bordered w-full h-32 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                    placeholder="Type rejection reason here..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    disabled={isRejecting}
                ></textarea>

                <div className="modal-action">
                    <button
                        className="btn btn-ghost"
                        onClick={() => rejectionModalRef.current.close()}
                        disabled={isRejecting}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn bg-red-600 hover:bg-red-700 text-white border-none gap-2"
                        onClick={handleReject}
                        disabled={isRejecting}
                    >
                        {isRejecting ? (
                            <><Loader2 size={18} className="animate-spin" /> Rejecting...</>
                        ) : (
                            <><Send size={18} /> Submit Rejection</>
                        )}
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default RejectionModal;