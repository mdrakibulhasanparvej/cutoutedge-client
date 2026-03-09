import React, { useRef, useState } from "react";
import { UploadCloud, FolderClosed } from "lucide-react";

const FileInput = ({ onFilesSelect }) => {
  const inputRef = useRef(null);
  const [text, setText] = useState("Select folder to upload");

  const handleChange = (e) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) {
      setText("Select folder to upload");
      return;
    }

    if (onFilesSelect) {
      onFilesSelect(fileList);
    }

    const folderName = fileList[0].webkitRelativePath.split("/")[0];
    setText(`${folderName} (${fileList.length} files)`);
  };

  return (
    <div className='w-full'>
      <label className='text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1 mb-2'>
        <UploadCloud size={12} /> Source Files
      </label>

      <div
        onClick={() => inputRef.current.click()}
        className='w-full px-4 py-3 bg-white border-2 border-dashed border-gray-200 rounded-md cursor-pointer 
                           hover:border-[#0F83B2] hover:bg-blue-50/30 transition-all flex items-center gap-3 text-sm'>
        <FolderClosed size={18} className='text-[#0F83B2]' />
        <span className='truncate text-gray-600 font-medium'>{text}</span>
      </div>

      <input
        webkitdirectory=''
        directory=''
        ref={inputRef}
        type='file'
        multiple
        onChange={handleChange}
        className='hidden'
      />
    </div>
  );
};

export default FileInput;
