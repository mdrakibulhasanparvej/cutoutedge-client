import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ClipboardList, Clock, Layers, AlertCircle, FileText, Zap, CheckCircle2, FileCode } from "lucide-react";
import FileInput from "../../components/shared/fileInput/FileInput";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MyAlert from "../../components/shared/alerts/MyAlert";
import OrderPreview from "../../components/order-preview/OrderPreview";

const CreateProject = () => {
  const axiosSecure = useAxiosSecure()
  const [selectedFiles, setSelectedFiles] = useState([]);
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      priority: "normal",
      categories: [],
      projectId: "",
    },
  });

  const formData = watch();
  const selectDeadline = watch("deadline");

  const handleFolderSelection = (files) => {
    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);

    if (fileArray.length > 0) {
      const folderName = fileArray[0].webkitRelativePath.split("/")[0];
      setValue("projectId", folderName)
    }
  };

  const fullCategoryList = [
    {
      title: "1. Basic Photo Editing",
      items: [
        "Exposure correction",
        "Contrast adjustment",
        "Highlight recovery",
        "Shadow adjustment",
        "White balance fix",
        "Color correction",
        "Color matching",
      ],
    },
    {
      title: "2. Background Editing",
      items: [
        "Background remove",
        "Clipping path",
        "Masking",
        "Pure white background",
        "Shadow create",
        "Reflection add",
        "Natural shadow maintain",
        "Background replace",
      ],
    },
    {
      title: "3. Advanced Retouching",
      items: [
        "Dust removal",
        "Scratch remove",
        "Spot healing",
        "Product reshape",
        "Symmetry fix",
        "Label straighten",
        "Logo clean",
        "Color enhancement",
        "Plastic shine control",
        "Metal reflection fix",
        "Glass transparency correction",
      ],
    },
    {
      title: "4. Commercial Enhancement",
      items: [
        "Product glow enhance",
        "Highlight polish",
        "Luxury look create",
        "Depth increase",
        "Contrast styling",
        "Brand color maintain",
        "Selling appeal",
      ],
    },
    {
      title: "5. E-commerce Optimization",
      items: [
        "Square crop (1:1)",
        "Marketplace size follow",
        "Resolution optimize",
        "Image compression",
        "Fast loading export",
        "Web optimized JPG/PNG",
      ],
    },
  ];

  const { mutateAsync: createOrder } = useMutation({
    mutationFn: async (finalData) => {
      const res = await axiosSecure.post("/files/register", finalData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      MyAlert({
        title: "Success!",
        text: "Project created successfully!",
        icon: "success"
      })

      navigate('/dashboard/design-online');
      setSelectedFiles([]);
    },
    onError: (err) => {
      MyAlert({
        title: "Oops...",
        text: "Failed to create project!",
        icon: "error"
      })
      console.error(err.message);
    }
  });


  const onSubmit = async (data) => {
    const {
      categories,
      deadline,
      customDeadline,
      projectId,
      instructions,
      priority,
    } = data;

    const finalDeadline =
      deadline === "other" ? Number(customDeadline) : Number(deadline);

    const finalData = {
      orderId: projectId,
      deadline: finalDeadline,
      categories,
      instructions,
      priority,
    };

    await createOrder(finalData);
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 font-sans text-gray-800 dark:text-gray-200'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8'>

        <div className='lg:col-span-7 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
          <div className='bg-gray-900 dark:bg-gray-800 p-4 text-white uppercase tracking-wider'>
            <h2 className='text-lg font-semibold flex items-center gap-2'>
              <Zap size={18} /> New Project Entry
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='p-6 space-y-6'>

            <div className='bg-gray-50 dark:bg-gray-700/40 p-4 rounded-md border border-dashed border-gray-300 dark:border-gray-600'>
              <FileInput onFilesSelect={handleFolderSelection} />
            </div>


            <div className='grid grid-cols-2 gap-4'>
              {/* projectid */}
              <div>
                <label className='text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1 mb-1'>
                  <ClipboardList size={12} /> Project ID
                </label>
                <input
                  type='text'
                  placeholder='#00000'
                  className='w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-[#0F83B2] transition-all text-sm font-medium text-gray-800 dark:text-gray-100'
                  {...register("projectId", { required: "Required" })}
                />
              </div>

              {/* Priority */}
              <div>
                <label className='text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1 mb-1'>
                  <AlertCircle size={12} /> Priority
                </label>
                <select
                  className='w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-[#0F83B2] text-sm text-gray-800 dark:text-gray-100'
                  {...register("priority")}>
                  <option value='normal'>Normal</option>
                  <option value='medium'>Medium</option>
                  <option value='high'>High</option>
                </select>
              </div>
            </div>

            {/* Instructions */}
            <div>
              <label className='text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1 mb-1'>
                <FileText size={12} /> Instructions
              </label>
              <textarea
                placeholder='Specific requirements...'
                rows='3'
                className='w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-[#0F83B2] text-sm text-gray-800 dark:text-gray-100'
                {...register("instructions", { required: "Required" })}
              />
            </div>

            {/* Service Categories with Scroll */}
            <div>
              <label className='text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1 mb-3'>
                <Layers size={12} /> Service Categories
              </label>
              <div className='space-y-4 max-h-75 overflow-y-auto pr-2 custom-scrollbar border rounded-md p-3 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'>
                {fullCategoryList.map((group, idx) => (
                  <div
                    key={idx}
                    className='bg-gray-50 dark:bg-gray-700/40 rounded-md border border-gray-200 dark:border-gray-600 p-3'>
                    <h4 className='text-[11px] font-extrabold text-[#0F83B2] uppercase mb-2 border-b pb-1 border-gray-200 dark:border-gray-600'>
                      {group.title}
                    </h4>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1'>
                      {group.items.map((item) => (
                        <label
                          key={item}
                          className='flex items-center gap-2 cursor-pointer hover:bg-white dark:hover:bg-gray-700 p-1 rounded transition-colors group'>
                          <input
                            type='checkbox'
                            value={item}
                            className='checkbox checkbox-xs checkbox-primary rounded-sm'
                            {...register("categories")}
                          />
                          <span className='text-[11px] text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors'>
                            {item}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deadline Selection */}
            <div>
              <label className='text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1 mb-1'>
                <Clock size={12} /> Deadline
              </label>
              <div className='flex gap-2'>
                <select
                  className='flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-[#0F83B2] text-sm text-gray-800 dark:text-gray-100'
                  defaultValue=''
                  {...register("deadline", { required: "Required" })}>
                  <option value='' disabled>
                    Select hours
                  </option>
                  <option value={12}>12h</option>
                  <option value={24}>24h</option>
                  <option value={48}>48h</option>
                  <option value='other'>Other</option>
                </select>
                {selectDeadline === "other" && (
                  <input
                    type='number'
                    placeholder='Hours'
                    className='w-28 px-3 py-2 bg-white dark:bg-gray-700 border border-[#0F83B2] rounded-md outline-none text-sm text-gray-800 dark:text-gray-100'
                    {...register("customDeadline", { required: true })}
                  />
                )}
              </div>
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className={`w-full font-bold py-3 rounded-md transition-all shadow-md text-sm uppercase tracking-wider flex items-center justify-center gap-2
                ${isSubmitting
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#0F83B2] hover:bg-[#0C6A8E] cursor-pointer text-white active:scale-95"
                }`}>
              {isSubmitting ? (
                <>
                  <span className='animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full'></span>
                  Processing...
                </>
              ) : (
                "Create Project"
              )}
            </button>
          </form>
        </div>

        <OrderPreview formData={formData} selectedFiles={selectedFiles} />
      </div>
    </div>
  );
};

export default CreateProject;
