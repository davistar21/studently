import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import formatSize from "~/utils/formatSize";

interface FileUploaderProps {
  onFileSelect?: (fil: File | null) => void;
}
const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    onFileSelect?.(file);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "/application/pdf": [".pdf"] },
    maxSize: 20 * 1024 * 1024,
  });

  const file = acceptedFiles[0] || null;
  return (
    <div
      {...getRootProps()}
      className="w-full p-6 gradient-border dark:bg-blue-100 "
    >
      <input {...getInputProps()} />
      <div className="space-y-4 cursor-pointer ">
        {file ? (
          <div
            className="uploader-selected-file"
            onClick={(e) => e.stopPropagation()}
          >
            <img src="/images/pdf.png" alt="pdf" className="size-10" />
            <div className="flex items-center space-x-3 ">
              <div>
                <p className="truncate text-gray-700 font-medium max-w-[90%] text-sm">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>
            <button
              className="p-2 cursor-pointer"
              onClick={(e) => {
                onFileSelect?.(null);
              }}
            >
              <img src="/icons/cross.svg" alt="" className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            <div className="mx-auto mb-2 w-16h-16 flex items-center justify-center">
              <img src="/icons/info.svg" alt="upload" className="size-20" />
            </div>
            <p className="text-lg text-gray-500 text-center">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-lg text-gray-500 text-center">PDF (max 20mb)</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default FileUploader;
