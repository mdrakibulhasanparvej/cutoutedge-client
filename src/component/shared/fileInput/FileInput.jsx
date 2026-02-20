import React, { useRef, useState } from 'react';

const FileInput = () => {
    const [files, setFiles] = useState([]);

    const inputRef = useRef(null);
    const [text, setText] = useState("Select a folder");

    const onFileChange = (fileList) => {
        setFiles(fileList);
    };

    const handleChange = (e) => {
        const files = e.target.files;

        if (!files || files.length === 0) {
            setText("Select a folder");
            return;
        }

        onFileChange(files)

        const folderName = files[0].webkitRelativePath.split("/")[0];


        setText(`${folderName} (${files.length} files)`);
    };

    return (
        <div>
            <label className="label">Upload your files</label>

            {/* Clickable fake input */}
            <div
                onClick={() => inputRef.current.click()}
                className="input bg-white cursor-pointer flex items-center"
            >
                {text}
            </div>

            {/* Real hidden input */}
            <input
                webkitdirectory=""
                ref={inputRef}
                type="file"
                multiple
                onChange={handleChange}
                className="hidden"
            />
        </div>
    );
};

export default FileInput;