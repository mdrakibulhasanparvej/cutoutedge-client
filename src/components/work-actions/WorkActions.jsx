import React, { useRef, useState } from 'react';
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MyConfirmAlert from '../shared/alerts/MyConfirmAlert';
import MyAlert from '../shared/alerts/MyAlert';
import { Check, ChevronsRight, PauseCircle, PlayCircle, TimerIcon, XCircle } from 'lucide-react';
import ActionButton from '../shared/action-button/ActionButton';
import toast from 'react-hot-toast';
import RejectionModal from '../shared/modals/RejectionModal';

const WorkActions = ({ file, orderId, refetch }) => {
    const rejectionModalRef = useRef(null)
    const [rejectionReason, setRejectionReason] = useState("")
    const { userId, role } = useUser()
    const axiosSecure = useAxiosSecure()
    const {
        currentStage,
        assignedTo,
        filename,
        stageLogs,
    } = file;


    const currentStageLog = [...stageLogs].reverse().find(s => s.stage === currentStage)
    const isTimerRunning = currentStageLog?.timer?.isRunning

    const isAdminOrIncharge = role === 'admin' || role === 'incharge'
    const isDesigner = role === 'designer'
    const isQC1 = role === 'qc1'
    const isQC2 = role === 'qc2'

    const pending = currentStage === 'pending'
    const isInProgress = currentStage === 'in-progress'
    const isInQC1 = currentStage === 'qc1'
    const isInQC2 = currentStage === 'qc2'

    const isAssignedUser = userId === assignedTo?._id

    const handleStartDesigning = async () => {
        const data = { orderId, filename, userId }
        const result = await MyConfirmAlert({
            title: "Start Designing?",
            text: "Your work timer will start upon confirmation.",
            icon: "info"
        })
        if (result.isConfirmed) {
            try {
                await axiosSecure.post('/files/start', data)
                MyAlert({ title: "Success", text: "Design started successfully", icon: "success" })
                refetch()
            } catch (err) {
                console.log(err.message)
                MyAlert({ title: "Error", text: "Something went wrong", icon: "error" })
            }
        }
    }

    const handleFinishDesigning = async () => {
        const data = { orderId, filename, targetStage: "qc1", role }
        const result = await MyConfirmAlert({
            title: "Submit Work?",
            text: "File will be moved to quality check 1."
        })
        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.post('/files/finish', data)
                if (res.data.success) {
                    MyAlert({ title: "Success", text: "File submitted for QC1" })
                    refetch()
                }
            } catch (err) {
                console.log(err.message)
                MyAlert({ title: "Error", text: "Something went wrong", icon: "error" })
            }
        }
    }

    const handleStartQC = async (stageName) => {
        const data = { orderId, filename, userId }
        const result = await MyConfirmAlert({
            title: `Start ${stageName}?`,
            text: "Your work timer will start upon confirmation.",
            icon: "info"
        })
        if (result.isConfirmed) {
            try {
                await axiosSecure.post('/files/qc/start', data)
                MyAlert({ title: "Success", text: `Started ${stageName}`, icon: "success" })
                refetch()
            } catch (err) {
                console.log(err.message)
                MyAlert({ title: "Error", text: "Something went wrong", icon: "error" })
            }
        }
    }

    const handleFinishQC = async (targetStage) => {
        let msgTarget = targetStage === 'done' ? 'completed stage' : targetStage;
        const data = { orderId, filename, targetStage, role }
        const result = await MyConfirmAlert({
            title: "Approve File?",
            text: `File will be moved to ${msgTarget}.`
        })
        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.post('/files/qc/finish', data)
                if (res.data.success) {
                    MyAlert({ title: "Success", text: "File approved successfully" })
                    refetch()
                }
            } catch (err) {
                console.log(err.message)
                MyAlert({ title: "Error", text: "Something went wrong", icon: "error" })
            }
        }
    }

    const handleReject = async () => {
        const data = {
            filename,
            orderId,
            reason: rejectionReason
        }
        try {
            const res = await axiosSecure.patch('/files/reject', data)
            if (res.data.success) {
                rejectionModalRef.current.close()
                setRejectionReason("")
                MyAlert({ title: "Success", text: "File rejected" })
                refetch()
            }
        } catch (err) {
            console.log(err.message)
            MyAlert({ title: "Error", text: "Something went wrong", icon: "error" })
        }
    }

    const handlePauseTimer = async () => {
        try {
            await axiosSecure.post(`/files/pause`, { orderId, filename, userId })
            toast.success("Timer Paused",
                {
                    icon: <TimerIcon />,
                    position: "top-right",
                    style: {
                        backgroundColor: '#0ea5e9',
                        color: '#fff',
                    }
                })
            refetch()
        } catch (err) {
            console.log(err.message)
            toast.error("Failed to pause timer", {
                icon: <TimerIcon />,
                position: "top-right",
                style: {
                    backgroundColor: '#0ea5e9',
                    color: '#fff',
                }
            })
        }
    }

    const handleStartTimer = async () => {
        try {
            await axiosSecure.post(`/files/resume`, { orderId, filename, userId })
            toast.success("Timer Started",
                {
                    icon: <TimerIcon />,
                    position: "top-right",
                    style: {
                        backgroundColor: '#0ea5e9',
                        color: '#fff',
                    }
                })
            refetch()
        } catch (err) {
            console.log(err.message)
            toast.success("Failed to start timer",
                {
                    icon: <TimerIcon />,
                    position: "top-right",
                    style: {
                        backgroundColor: '#0ea5e9',
                        color: '#fff',
                    }
                })
        }
    }

    if (isAdminOrIncharge) return null;

    return (
        <div className="w-full space-y-1">

            {/* designing Actions */}
            {isDesigner && (
                <div>
                    {pending && (
                        <ActionButton
                            onClick={handleStartDesigning}
                            icon={ChevronsRight}
                            text="Start Designing"
                            variant="success"
                            iconPosition="right"
                        />
                    )}
                    {isInProgress && (
                        <ActionButton
                            onClick={handleFinishDesigning}
                            icon={Check}
                            text="Finish Designing"
                            variant="success"
                        />
                    )}
                </div>
            )}

            {/* QC1 Actions */}
            {isQC1 && isInQC1 && (
                <div>
                    {!assignedTo ? (
                        <ActionButton
                            onClick={() => handleStartQC('QC1')}
                            icon={ChevronsRight}
                            text="Start QC1"
                            variant="success"
                            iconPosition="right"
                        />
                    ) : (
                        <div className="flex gap-2 w-full">
                            <ActionButton
                                onClick={() => handleFinishQC('qc2')}
                                icon={Check}
                                text="Approve"
                                variant="success"
                            />
                            <ActionButton
                                onClick={() => { rejectionModalRef.current.showModal() }}
                                icon={XCircle}
                                text="Reject"
                                variant="reject"
                            />
                        </div>
                    )}
                </div>
            )}

            {isQC2 && isInQC2 && (
                <div>
                    {!assignedTo ? (
                        <ActionButton
                            onClick={() => handleStartQC('QC2')}
                            icon={ChevronsRight}
                            text="Start QC2"
                            variant="success"
                            iconPosition="right"
                        />
                    ) : (
                        <div className="flex gap-2 w-full">
                            <ActionButton
                                onClick={() => handleFinishQC('done')}
                                icon={Check}
                                text="Approve"
                                variant="success"
                            />
                            <ActionButton
                                onClick={() => { rejectionModalRef.current.showModal() }}
                                icon={XCircle}
                                text="Reject"
                                variant="reject"
                            />
                        </div>
                    )}
                </div>
            )}

            {isAssignedUser && (
                <div>
                    {!isTimerRunning ? (
                        <ActionButton
                            onClick={handleStartTimer}
                            icon={PlayCircle}
                            text="Start Timer"
                            variant="primary"
                        />
                    ) : (
                        <ActionButton
                            onClick={handlePauseTimer}
                            icon={PauseCircle}
                            text="Pause Timer"
                            variant="warning"
                        />
                    )}
                </div>
            )}

            {/* Rejection Modal */}
            <RejectionModal
                rejectionModalRef={rejectionModalRef}
                rejectionReason={rejectionReason}
                setRejectionReason={setRejectionReason}
                handleReject={handleReject}
                filename={filename}
            />
        </div>
    );
};

export default WorkActions;