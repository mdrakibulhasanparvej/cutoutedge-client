import React from 'react';
import { TiTick } from "react-icons/ti";

const StageLogModal = ({ id, stageLogs }) => {

    if (!stageLogs) return null;

    return (
        <dialog id={id} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box max-w-2xl bg-white dark:bg-gray-800 border dark:border-gray-700">
                <h3 className="font-bold text-lg mb-6 text-gray-800 dark:text-white">Project History Log</h3>

                <ul className="timeline timeline-vertical timeline-compact">
                    {stageLogs.map((s, i) => {
                        const { endedAt, stage, handledBy, note, startedAt } = s;
                        const isLast = i === stageLogs.length - 1;

                        return (
                            <li key={i}>
                                {/* Progress Line Logic */}
                                {i !== 0 && <hr className="bg-primary" />}

                                {/* Stage Title */}
                                <div className="timeline-start font-mono text-sm font-bold uppercase text-primary">
                                    {stage}
                                </div>

                                {/* The Icon/Tick Node */}
                                <div className="timeline-middle">
                                    <div className="bg-primary text-white rounded-full p-1 shadow-md">
                                        <TiTick size={16} />
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="timeline-end timeline-box mb-6 border-none shadow-sm bg-gray-50 dark:bg-gray-700/50 p-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex gap-2 justify-between items-center mb-1">
                                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                By: {handledBy?.email}
                                            </span>
                                            <span className="badge badge-sm badge-outline text-[10px]">
                                                {new Date(startedAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                                            <span className="font-medium text-primary">Note:</span> {note || "No notes provided."}
                                        </p>

                                        <div className="mt-2 flex gap-4 text-[11px] text-gray-400 border-t pt-2 border-gray-200 dark:border-gray-600">
                                            <span>Start: {new Date(startedAt).toLocaleTimeString()}</span>
                                            {endedAt && <span>End: {new Date(endedAt).toLocaleTimeString()}</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Line Logic */}
                                {!isLast && <hr className="bg-primary" />}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default StageLogModal;
