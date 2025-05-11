import { addToast, Button, Input } from "@heroui/react";
import {
  AlertCircle,
  File,
  FileCheck,
  Files,
  FileX,
  Upload,
  X,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { uploadPatientFiles } from "../lib/api/api";

interface FileItem {
  id: string;
  file: File;
}

interface UploadStats {
  files_processed: number;
  total_added: number;
  total_duplicates: number;
  file_stats: {
    file: string;
    added: number;
    duplicates: number;
    errors: string[];
  }[];
}

const FileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStats, setUploadStats] = useState<UploadStats | null>(null);

  const addFiles = (newFiles: File[]) => {
    setUploadStats(null);
    const newFileItems: FileItem[] = newFiles.map((file) => ({
      file,
      id: `${file.name}-${Date.now()}`,
    }));

    setFiles((prev) => [...prev, ...newFileItems]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(Array.from(event.target.files));
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleUpload = () => {
    setIsUploading(true);
    setUploadStats(null);
    const file_objs = files.map((file) => file.file);
    uploadPatientFiles(file_objs)
      .then((response) => {
        addToast({
          title: "Patient data uploaded successfully",
          color: "success",
          timeout: 1500,
        });
        setUploadStats(response);
      })
      .catch((error) =>
        addToast({
          title: "Something terrible happened!",
          description: error.data,
          color: "danger",
          timeout: 1500,
        })
      )
      .finally(() => {
        setIsUploading(false);
        setFiles([]);
      });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`bg-white rounded-lg border-2 border-dashed p-6 text-center ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Input
          type="file"
          ref={fileInputRef}
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center space-y-2 py-4">
          <Upload className="h-10 w-10 text-gray-400" />
          <h3 className="text-lg font-medium">Drag and drop files here</h3>
          <p className="text-sm text-gray-500">
            or{" "}
            <span className="text-blue-500 hover:underline">browse files</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Support for multiple files
          </p>
        </div>
      </div>
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3>Selected Files ({files.length})</h3>
            <Button variant="bordered" onPress={() => setFiles([])}>
              Clear All
            </Button>
          </div>
          <div className="space-y-3 overflow-y-auto p-1 max-h-60">
            {files.map((file) => (
              <div key={file.id}>
                <div className="inline-flex justify-between items-center w-full bg-gray-200 p-4 rounded-lg">
                  <div className="flex">
                    <span className="inline-flex gap-2">
                      <File className="h-6 w-6 text-gray-500" />
                      {file.file.name}
                    </span>
                    <p className="text-gray-400 px-8">
                      {formatFileSize(file.file.size)}
                    </p>
                  </div>
                  <Button
                    isIconOnly
                    variant="ghost"
                    size="sm"
                    className="p-0 h-8 w-8"
                    onPress={() => removeFile(file.id)}
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button
            size="lg"
            radius="lg"
            className="bg-blue-700 text-white items-center"
            startContent={!isUploading && <Upload className="h-4 w-4" />}
            onPress={handleUpload}
            isLoading={isUploading}
          >
            Upload Files
          </Button>
        </div>
      )}

      {uploadStats && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Upload Results</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-500 font-medium">
                Files Processed
              </p>
              <p className="text-3xl font-bold">
                {uploadStats.files_processed}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <p className="text-sm text-green-500 font-medium">
                Records Added
              </p>
              <p className="text-3xl font-bold">{uploadStats.total_added}</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <p className="text-sm text-amber-500 font-medium">Duplicates</p>
              <p className="text-3xl font-bold">
                {uploadStats.total_duplicates}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {uploadStats.file_stats.map((fileStat, index) => (
              <div key={index} className="border rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Files className="h-5 w-5 text-blue-500" />
                    <h4 className="font-medium">{fileStat.file}</h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <FileCheck className="h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      <span className="font-medium">{fileStat.added}</span>{" "}
                      records added
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileX className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">
                      <span className="font-medium">{fileStat.duplicates}</span>{" "}
                      duplicates found
                    </span>
                  </div>
                </div>

                {fileStat.errors && fileStat.errors.length > 0 && (
                  <div className="mt-2">
                    <div className="inline-flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-700" /> Errors (
                      {fileStat.errors.length})
                    </div>
                    <div>
                      <ul className="list-disc pl-5 mt-2 text-xs space-y-1 max-h-32 overflow-y-auto">
                        {fileStat.errors.map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
