import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  ClipboardList,
  Clock,
  Layers,
  AlertCircle,
  FileText,
  Zap,
  CheckCircle2,
  FileCode,
} from "lucide-react";
import FileInput from "../../../component/shared/fileInput/FileInput";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const CreateProject = () => {
  const axiosSecure = useAxiosSecure()
  const [selectedFiles, setSelectedFiles] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
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

    try {
      const res = await axiosSecure.post("/files/register", finalData);

      if (res.data) {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Project created successfully!",
          confirmButtonColor: "#0F83B2",
        });
        reset();
        setSelectedFiles([])
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create project!",
        confirmButtonColor: "#0F83B2",
      });
      console.log(err.message)
    }
  };

  return (
    <div className='min-h-screen bg-white p-4 md:p-8 font-sans text-[#172B4D]'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8'>

        <div className='lg:col-span-7 bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden'>
          <div className='bg-[#091E42] p-4 text-white uppercase tracking-wider'>
            <h2 className='text-lg font-semibold flex items-center gap-2'>
              <Zap size={18} /> New Project Entry
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='p-6 space-y-6'>

            <div className='bg-gray-50 p-4 rounded-md border border-dashed border-gray-300'>
              <FileInput onFilesSelect={handleFolderSelection} />
            </div>


            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-[11px] font-bold text-gray-500 uppercase flex items-center gap-1 mb-1'>
                  <ClipboardList size={12} /> Project ID
                </label>
                <input
                  type='text'
                  placeholder='#00000'
                  className='w-full px-3 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-[#0F83B2] transition-all text-sm font-medium'
                  {...register("projectId", { required: "Required" })}
                />
              </div>

              <div>
                <label className='text-[11px] font-bold text-gray-500 uppercase flex items-center gap-1 mb-1'>
                  <AlertCircle size={12} /> Priority
                </label>
                <select
                  className='w-full px-3 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-[#0F83B2] text-sm'
                  {...register("priority")}>
                  <option value='normal'>Normal</option>
                  <option value='medium'>Medium</option>
                  <option value='high'>High</option>
                </select>
              </div>
            </div>

            {/* Instructions */}
            <div>
              <label className='text-[11px] font-bold text-gray-500 uppercase flex items-center gap-1 mb-1'>
                <FileText size={12} /> Instructions
              </label>
              <textarea
                placeholder='Specific requirements...'
                rows='3'
                className='w-full px-3 py-2 bg-white border border-gray-300 rounded-md outline-none focus:border-[#0F83B2] text-sm'
                {...register("instructions", { required: "Required" })}
              />
            </div>

            {/* Service Categories with Scroll */}
            <div>
              <label className='text-[11px] font-bold text-gray-500 uppercase flex items-center gap-1 mb-3'>
                <Layers size={12} /> Service Categories
              </label>
              <div className='space-y-4 max-h-75 overflow-y-auto pr-2 custom-scrollbar border rounded-md p-3 border-gray-100 bg-white'>
                {fullCategoryList.map((group, idx) => (
                  <div
                    key={idx}
                    className='bg-gray-50 rounded-md border border-gray-200 p-3'>
                    <h4 className='text-[11px] font-extrabold text-[#0F83B2] uppercase mb-2 border-b pb-1 border-gray-200'>
                      {group.title}
                    </h4>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1'>
                      {group.items.map((item) => (
                        <label
                          key={item}
                          className='flex items-center gap-2 cursor-pointer hover:bg-white p-1 rounded transition-colors group'>
                          <input
                            type='checkbox'
                            value={item}
                            className='checkbox checkbox-xs checkbox-primary rounded-sm'
                            {...register("categories")}
                          />
                          <span className='text-[11px] text-gray-600 group-hover:text-black transition-colors'>
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
              <label className='text-[11px] font-bold text-gray-500 uppercase flex items-center gap-1 mb-1'>
                <Clock size={12} /> Deadline
              </label>
              <div className='flex gap-2'>
                <select
                  className='flex-1 px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-[#0F83B2] text-sm'
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
                    className='w-28 px-3 py-2 border border-[#0F83B2] rounded-md outline-none text-sm'
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


        <div className='lg:col-span-5'>
          <div className='bg-white rounded-md shadow-sm border border-gray-200 sticky top-8 overflow-hidden'>
            <div className='px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50'>
              <h3 className='text-[11px] font-bold text-gray-400 uppercase tracking-widest'>
                Order Preview
              </h3>
              <div
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${formData.priority === "high" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                {formData.priority || "Normal"}
              </div>
            </div>

            <div className='p-6 space-y-5'>
              <div>
                <label className='text-[10px] text-gray-400 font-bold uppercase block mb-1'>
                  Project Identifier
                </label>
                <h4 className='text-xl font-bold text-[#172B4D] border-l-4 border-[#0F83B2] pl-3 truncate'>
                  {formData?.projectId}
                </h4>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='bg-[#F4F5F7] p-3 rounded-md border border-gray-100'>
                  <label className='text-[9px] text-gray-500 font-bold uppercase block mb-1'>
                    Timeline
                  </label>
                  <div className='flex items-center gap-1.5 text-[#172B4D] font-bold text-sm'>
                    <Clock size={12} className='text-[#0F83B2]' />
                    {formData.deadline === "other"
                      ? formData.customDeadline
                      : formData.deadline || "0"}
                    h
                  </div>
                </div>
                <div className='bg-[#F4F5F7] p-3 rounded-md border border-gray-100'>
                  <label className='text-[9px] text-gray-500 font-bold uppercase block mb-1'>
                    Total Files
                  </label>
                  <div className='flex items-center gap-1.5 text-[#172B4D] font-bold text-sm'>
                    <CheckCircle2 size={12} className='text-[#0F83B2]' />
                    {selectedFiles.length} Files
                  </div>
                </div>
              </div>

              {/* Attached Files List Preview */}
              <div>
                <label className='text-[10px] text-gray-400 font-bold uppercase block mb-2'>
                  Attached Files
                </label>
                <div className='bg-gray-50 border border-gray-100 rounded-md p-2 max-h-35 overflow-y-auto custom-scrollbar'>
                  {selectedFiles.length > 0 ? (
                    <div className='space-y-1'>
                      {selectedFiles.map((f, i) => (
                        <div
                          key={i}
                          className='flex items-center gap-2 text-[10px] text-gray-600 bg-white p-1.5 rounded border border-gray-50 truncate'>
                          <FileCode size={10} className='text-[#0F83B2]' />{" "}
                          {f.name}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='text-[10px] text-gray-300 italic text-center py-2'>
                      Upload folder to see files
                    </p>
                  )}
                </div>
              </div>


              <div className='flex flex-wrap gap-1.5'>
                {formData.categories?.length > 0 ? (
                  formData.categories.map((c) => (
                    <span
                      key={c}
                      className='px-2 py-1 bg-white text-[#0F83B2] text-[9px] font-bold rounded-sm border border-blue-100 shadow-sm'>
                      {c}
                    </span>
                  ))
                ) : (
                  <span className='text-[10px] text-gray-300 italic'>
                    No services selected
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
