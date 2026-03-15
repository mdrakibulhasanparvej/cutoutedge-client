import React, { useRef, useState } from 'react';
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MyConfirmAlert from '../shared/alerts/MyConfirmAlert';
import MyAlert from '../shared/alerts/MyAlert';
import { Check, ChevronsRight, PauseCircle, PlayCircle, TimerIcon, XCircle } from 'lucide-react';
import ActionButton from '../shared/action-button/ActionButton';
import toast from 'react-hot-toast';
import RejectionModal from '../shared/modals/RejectionModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const WorkActions = ({ file, orderId, refetch }) => {
    const queryClient = useQueryClient()
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

    // Mutations
    const startDesignMutation = useMutation({
        mutationFn: (data) => axiosSecure.post('/files/start', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] })
            MyAlert({ title: "Success", text: "Design started successfully", icon: "success" })
            refetch()
        },
        onError: (err) => {
            console.log(err.message)
            MyAlert({ title: "Error", text: "Something went wrong", icon: "error" })
        }
    })

    const finishDesignMutation = useMutation({
        mutationFn: (data) => axiosSecure.post('/files/finish', data),
        onSuccess: (res) => {
            if (res.data.success) {
                queryClient.invalidateQueries({ queryKey: ["orders"] })
                MyAlert({ title: "Success", text: "File submitted for QC1" })
                refetch()
            }
        },
        onError: (err) => {
            console.log(err.message)
            MyAlert({ title: "Error", text: "Something went wrong", icon: "error" })
        }
    })

    const startQCMutation = useMutation({
        mutationFn: (data) => axiosSecure.post('/files/qc/start', data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["orders"] })
            MyAlert({ title: "Success", text: `Started ${variables.stageName}`, icon: "success" })
            refetch()
        },
        onError: (err) => {
            console.log(err.message)
            MyAlert({ title: "Error", text: "Something went wrong", icon: "error" })
        }
    })

    const finishQCMutation = useMutation({
        mutationFn: (data) => axiosSecure.post('/files/qc/finish', data),
        onSuccess: (res) => {
            if (res.data.success) {
                queryClient.invalidateQueries({ queryKey: ["orders"] })
                MyAlert({ title: "Success", text: "File approved successfully" })
                refetch()
            }
        },
        onError: (err) => {
            console.log(err.message)
            MyAlert({ title: "Error", text: "Something went wrong", icon: "error" })
        }
    })

    const rejectMutation = useMutation({
        mutationFn: (data) => axiosSecure.patch('/files/reject', data),
        onSuccess: (res) => {
            if (res.data.success) {
                queryClient.invalidateQueries({ queryKey: ["orders"] })
                rejectionModalRef.current.close()
                setRejectionReason("")
                MyAlert({ title: "Success", text: "File rejected" })
                refetch()
            }
        },
        onError: (err) => {
            console.log(err.message)
            MyAlert({ title: "Error", text: "Something went wrong", icon: "error" })
        }
    })

    const pauseTimerMutation = useMutation({
        mutationFn: (data) => axiosSecure.post('/files/pause', data),
        onSuccess: () => {
            toast.success("Timer Paused", { icon: <TimerIcon />, position: "top-right", style: { backgroundColor: '#0ea5e9', color: '#fff' } })
            refetch()
        },
        onError: (err) => {
            console.log(err.message)
            toast.error("Failed to pause timer", { icon: <TimerIcon />, position: "top-right", style: { backgroundColor: '#0ea5e9', color: '#fff' } })
        }
    })

    const resumeTimerMutation = useMutation({
        mutationFn: (data) => axiosSecure.post('/files/resume', data),
        onSuccess: () => {
            toast.success("Timer Started", { icon: <TimerIcon />, position: "top-right", style: { backgroundColor: '#0ea5e9', color: '#fff' } })
            refetch()
        },
        onError: (err) => {
            console.log(err.message)
            toast.error("Failed to start timer", { icon: <TimerIcon />, position: "top-right", style: { backgroundColor: '#0ea5e9', color: '#fff' } })
        }
    })

    // Handlers
    const handleStartDesigning = async () => {
        const result = await MyConfirmAlert({ title: "Start Designing?", text: "Your work timer will start upon confirmation.", icon: "info" });
        if (result.isConfirmed) startDesignMutation.mutate({ orderId, filename, userId });
    }

    const handleFinishDesigning = async () => {
        const result = await MyConfirmAlert({ title: "Submit Work?", text: "File will be moved to quality check 1." });
        if (result.isConfirmed) finishDesignMutation.mutate({ orderId, filename, targetStage: "qc1", role });
    }

    const handleStartQC = async (stageName) => {
        const result = await MyConfirmAlert({ title: `Start ${stageName}?`, text: "Your work timer will start upon confirmation.", icon: "info" });
        if (result.isConfirmed) startQCMutation.mutate({ orderId, filename, userId, stageName });
    }

    const handleFinishQC = async (targetStage) => {
        const msgTarget = targetStage === 'done' ? 'completed stage' : targetStage;
        const result = await MyConfirmAlert({ title: "Approve File?", text: `File will be moved to ${msgTarget}.` });
        if (result.isConfirmed) finishQCMutation.mutate({ orderId, filename, targetStage, role });
    }

    const handleReject = () => {
        rejectMutation.mutate({ filename, orderId, reason: rejectionReason });
    }

    if (isAdminOrIncharge) return null;

    // Simplify rendering QC actions
    const renderQCActions = (stageName, nextStage) => {
        if (!assignedTo) {
            return (
                <ActionButton
                    onClick={() => handleStartQC(stageName)}
                    icon={ChevronsRight}
                    text={`Start ${stageName}`}
                    variant="success"
                    iconPosition="right"
                    isLoading={startQCMutation.isPending}
                />
            );
        }

        if (isAssignedUser) {
            return (
                <div className="flex gap-2 w-full">
                    <ActionButton
                        onClick={() => handleFinishQC(nextStage)}
                        icon={Check}
                        text="Approve"
                        variant="success"
                        isLoading={finishQCMutation.isPending}
                        disabled={rejectMutation.isPending}
                    />
                    <ActionButton
                        onClick={() => rejectionModalRef.current.showModal()}
                        icon={XCircle}
                        text="Reject"
                        variant="reject"
                        disabled={finishQCMutation.isPending || rejectMutation.isPending}
                    />
                </div>
            );
        }
        return null;
    }

    return (
        <div className="w-full space-y-1">

            {/* Designing Actions */}
            {isDesigner && pending && (
                <ActionButton
                    onClick={handleStartDesigning}
                    icon={ChevronsRight}
                    text="Start Designing"
                    variant="success"
                    iconPosition="right"
                    isLoading={startDesignMutation.isPending}
                />
            )}

            {isDesigner && isInProgress && isAssignedUser && (
                <ActionButton
                    onClick={handleFinishDesigning}
                    icon={Check}
                    text="Finish Designing"
                    variant="success"
                    isLoading={finishDesignMutation.isPending}
                />
            )}

            {/* QC1 Actions */}
            {(isQC1 || isDesigner) && isInQC1 && renderQCActions('QC1', 'qc2')}

            {/* QC2 Actions */}
            {(isQC2 || isDesigner) && isInQC2 && renderQCActions('QC2', 'done')}

            {/* Timer Actions */}
            {isAssignedUser && (
                <div>
                    {!isTimerRunning ? (
                        <ActionButton
                            onClick={() => resumeTimerMutation.mutate({ orderId, filename, userId })}
                            icon={PlayCircle}
                            text="Start Timer"
                            variant="primary"
                            isLoading={resumeTimerMutation.isPending}
                            disabled={pauseTimerMutation.isPending}
                        />
                    ) : (
                        <ActionButton
                            onClick={() => pauseTimerMutation.mutate({ orderId, filename, userId })}
                            icon={PauseCircle}
                            text="Pause Timer"
                            variant="warning"
                            isLoading={pauseTimerMutation.isPending}
                            disabled={resumeTimerMutation.isPending}
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
                isRejecting={rejectMutation.isPending}
            />
        </div>
    );
};

export default WorkActions;