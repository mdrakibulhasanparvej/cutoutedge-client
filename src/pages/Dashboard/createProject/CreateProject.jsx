import React from 'react';
import { useForm } from 'react-hook-form';
import FileInput from '../../../component/shared/fileInput/FileInput';
import useAxios from '../../../hook/useAxios';

const CreateProject = () => {

    const axios = useAxios()


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const selectDeadline = watch('deadline')

    const onSubmit = async (data) => {
        const { categories, deadline, customDeadline, projectId, instructions } = data;

        const finalDeadline = deadline === 'other' ? Number(customDeadline) : Number(deadline)

        const finalData = {
            orderId: projectId,
            deadline: finalDeadline,
            categories,
            instructions
        };

        const res = await axios.post('/files/register',
            finalData,
            {
                headers: {
                    "x-user-id": "6997518309071ee6a5465c46"
                }
            })
        if (res.data) {
            alert("project creation complete")
        }
        alert("failed to create project")
    };

    return (
        <div className='flex justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">

                    {/* Folder Upload  */}
                    <FileInput />

                    {/* ProjectId */}
                    <label className="label">Project id</label>
                    <input
                        type="text"
                        className="input bg-white"
                        placeholder="#00000"
                        {...register("projectId", {
                            required: "Project id is required"
                        })}
                    />
                    {errors.projectId && (
                        <span className="text-red-500 text-sm">
                            {errors.projectId.message}
                        </span>
                    )}


                    {/* Instructions */}

                    <label className="label">Instructions</label>
                    <input
                        type="text"
                        className="input bg-white"
                        placeholder="instructions"
                        {...register("instructions", {
                            required: "Instructions are required"
                        })}
                    />
                    {errors.instructions && (
                        <span className="text-red-500 text-sm">
                            {errors.instructions.message}
                        </span>
                    )}

                    {/* Categories */}
                    <label className="label">Categories</label>
                    <div className='flex gap-4'>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                value="category 1"
                                className="checkbox text-black"
                                {...register("categories")}
                            />
                            <p>Category 1</p>
                        </div>

                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                value="category 2"
                                className="checkbox text-black"
                                {...register("categories")}
                            />
                            <p>Category 2</p>
                        </div>

                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                value="category 3"
                                className="checkbox text-black"
                                {...register("categories")}
                            />
                            <p>Category 3</p>
                        </div>
                    </div>

                    {/* Deadline */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Pick a deadline</legend>
                        <select
                            className="select bg-white"
                            defaultValue={null}
                            {...register("deadline", {
                                required: "Deadline is required"
                            })}
                        >
                            <option disabled value="">Pick a Deadline</option>
                            <option value={6}>6h</option>
                            <option value={12}>12h</option>
                            <option value={24}>24h</option>
                            <option value={48}>48h</option>
                            <option value={72}>72h</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.deadline && (
                            <span className="text-red-500 text-sm">
                                {errors.deadline.message}
                            </span>
                        )}

                        {selectDeadline === "other" && (
                            <div className="mt-2">
                                <input
                                    type="number"
                                    min={1}
                                    placeholder="Enter hours (e.g. 124)"
                                    className="input bg-white"
                                    onWheel={(e) => e.target.blur()}
                                    {...register("customDeadline", {
                                        required: "Please enter custom hours",
                                        min: {
                                            value: 1,
                                            message: "Hours must be greater than 0"
                                        },
                                        valueAsNumber: true
                                    })}
                                />
                                {errors.customDeadline && (
                                    <span className="text-red-500 text-sm">
                                        {errors.customDeadline.message}
                                    </span>
                                )}
                            </div>
                        )}

                    </fieldset>



                    <input className="btn btn-neutral mt-4" type='submit' />
                </fieldset>
            </form>
        </div>
    );
};

export default CreateProject;
