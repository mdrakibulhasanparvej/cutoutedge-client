import React from 'react';
import useUser from '../../../hook/useUser';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import MyConfirmAlert from './MyConfirmAlert';
import MyAlert from './MyAler';
import { CheckLine, ChevronsRight, PauseCircleIcon, PlayCircleIcon } from 'lucide-react';

const WorkActions = ({ file, orderId, refetch }) => {
    const { userId, role } = useUser()
    const axiosSecure = useAxiosSecure()
    const {
        currentStage,
        assignedTo,
        filename,
        stageLogs,
    } = file;

    const isTimerRunning = stageLogs.find(s => s?.stage === currentStage)?.timer?.isRunning

    // console.log(file)

    // role based permissions
    const isAdminOrIncharge = role === 'admin' || role === 'incharge'
    const isDesigner = role === 'designer'
    const isQC1 = role === 'qc1'
    const isQC2 = role === 'qc2'
    const pending = currentStage === 'pending'
    const isInProgress = currentStage === 'in-progress'

    const isAssignedUser = userId === assignedTo?._id


    // api callings
    const handleStartWork = async () => {

        const data = {
            orderId,
            filename,
            userId
        }

        const result = await MyConfirmAlert({
            title: "Are you sure u want to start editing this file?",
            text: "Your work timer will start if you click yes",
            icon: "info"
        })
        if (result.isConfirmed) {
            try {
                axiosSecure.post('/files/start', data)
                    .then(() => {
                        MyAlert({
                            title: "Success",
                            text: "you have started this design",
                            icon: "success"
                        })
                        refetch()
                    })
            } catch (err) {
                MyAlert({
                    title: "error",
                    text: "Something went wrong, please try again",
                    icon: "error"
                })
                console.log(err.message)
            }
        }
    }

    const handleFinishDesigning = async () => {
        const data = {
            orderId,
            filename,
            targetStage: "qc1",
            role
        }
        const result = await MyConfirmAlert({
            title: "Are you sure?",
            text: "you want to submit your work?"
        })
        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.post('/files/finish', data)
                if (res.data.success) {
                    MyAlert({
                        title: "success",
                        text: "File moved for quality-checking-1"
                    })
                    refetch()
                }
            } catch (err) {
                MyAlert({
                    title: "error",
                    text: "Something went wrong, please try again",
                    icon: "error"
                })
                console.log(err.message)
            }
        }
    }


    // timer start-pause

    const handlePauseTimer = async () => {
        try {
            const data = {
                orderId,
                filename,
                userId
            }
            console.log(data)
            axiosSecure.post(`/files/pause`, data)
                .then(() => {
                    MyAlert({
                        title: "Success",
                        text: "you have started this design",
                        icon: "success"
                    })
                    refetch()
                })
        } catch (err) {
            MyAlert({
                title: "error",
                text: "Something went wrong, please try again",
                icon: "error"
            })
            console.log(err.message)
        }
    }

    const handleStartTimer = async () => {
        try {
            const data = {
                orderId,
                filename,
                userId
            }
            console.log(data)
            axiosSecure.post(`/files/resume`, data)
                .then(() => {
                    MyAlert({
                        title: "Success",
                        text: "you have started the timer",
                        icon: "success"
                    })
                    refetch()
                })
        } catch (err) {
            MyAlert({
                title: "error",
                text: "Something went wrong, please try again",
                icon: "error"
            })
            console.log(err.message)
        }
    }

    return (
        <div className='w-full'>
            {!isAdminOrIncharge &&
                <div className='space-y-1'>
                    {/* action buttons for designer */}
                    <div>
                        {isDesigner &&
                            <div>
                                {pending &&
                                    < button
                                        onClick={handleStartWork}
                                        className='flex items-center justify-center px-2 py-1 gap-px bg-green-400 hover:bg-green-500 text-white text-xs font-bold rounded-md w-full transition-all active:scale-95 shadow-sm cursor-pointer'>
                                        Start Designing
                                        <ChevronsRight size={14} />
                                    </button>
                                }
                                {isInProgress &&
                                    < button
                                        onClick={handleFinishDesigning}
                                        className='flex items-center justify-center px-2 py-1 gap-px bg-green-400 hover:bg-green-500 text-white text-xs font-bold rounded-md w-full transition-all active:scale-95 shadow-sm cursor-pointer'>
                                        <CheckLine size={14} />
                                        Finish Designing
                                    </button>
                                }
                            </div>
                        }
                    </div>

                    {/* action buttons for qc1 */}
                    <div>
                        {isQC1 &&
                            <div>
                                {pending &&
                                    < button
                                        onClick={handleStartWork}
                                        className='flex items-center justify-center px-2 py-1 gap-px bg-green-400 hover:bg-green-500 text-white text-xs font-bold rounded-md w-full transition-all active:scale-95 shadow-sm cursor-pointer'>
                                        Start quality check
                                        <ChevronsRight size={14} />
                                    </button>
                                }
                                {isInProgress &&
                                    < button
                                        onClick={handleFinishDesigning}
                                        className='flex items-center justify-center px-2 py-1 gap-px bg-green-400 hover:bg-green-500 text-white text-xs font-bold rounded-md w-full transition-all active:scale-95 shadow-sm cursor-pointer'>
                                        <CheckLine size={14} />
                                        Finish Designing
                                    </button>
                                }
                            </div>
                        }
                    </div>

                    {/* timer start pause for all */}
                    {isAssignedUser &&
                        < div >
                            {!isTimerRunning ?
                                <button
                                    onClick={handleStartTimer}
                                    className='flex items-center justify-center px-2 py-1 gap-1 bg-red-400 hover:bg-red-500 text-white text-xs font-bold rounded-md w-full transition-all active:scale-95 shadow-sm cursor-pointer'>
                                    <PlayCircleIcon size={14} />
                                    Start Timer
                                </button>
                                :
                                <button
                                    onClick={handlePauseTimer}
                                    className='flex items-center justify-center px-2 py-1 gap-1 bg-yellow-400 hover:bg-yellow-500 text-white text-xs font-bold rounded-md w-full transition-all active:scale-95 shadow-sm cursor-pointer'>
                                    <PauseCircleIcon size={14} />
                                    Pause Timer
                                </button>
                            }
                        </div>}
                </div>
            }
        </div >
    );
};

export default WorkActions;