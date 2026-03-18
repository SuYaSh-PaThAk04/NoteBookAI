import { Trash } from "lucide-react";
import React from "react";
import { deleteUploadedItem } from "../../../api/api";
import toast from "react-hot-toast";

export default function UploadRes({ indexing, uploads, setUploads }) {

  const handleDelete = async (id, type) => {
    try {
      await deleteUploadedItem(id, type);
      // Remove from state after deletion
      toast.success("Resource Deleted Successfullly.")
      setUploads((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      toast.error("Deletion Failed")
      console.error(error);
    }
  };
  

  const renderName = (u) => {
    switch (u.type) {
      case "file":
        return `File: ${u.fileName || u.name}`;
      case "web":
        return `Website: ${u.webUrl || u.url}`;
      case "youtube":
        return `YouTube: ${u.videoId || u.name}`;
      case "text":
        return `Text: ${u.name || u.text?.slice(0, 30) + "..."}`;
      default:
        return u.name || u.id;
    }
  };

  return (
    <div className="mt-5">
      {/* Uploaded Section */}
      <div className="p-4 bg-white dark:bg-gray-900 shadow-md rounded-xl transition-colors duration-300">
        <p className="font-semibold mb-4 text-lg dark:text-white">📑 Uploaded Resources</p>

        {indexing && (
          <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">Indexing your document...</p>
        )}

        {uploads?.length === 0 && !indexing && (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No uploads yet.</p>
        )}

        <div className="flex flex-col gap-4">
          {uploads?.map((u) => (
            <div
              key={u.id}
              className="flex justify-between items-center border-2 border-green-200 dark:border-gray-700 bg-green-50 dark:bg-gray-800 text-gray-900 dark:text-white shadow-md rounded-2xl px-4 py-3 transition-colors duration-300"
            >
              <p className="font-medium text-sm sm:text-base break-words">{renderName(u)}</p>
              <button
                onClick={() => handleDelete(u.id, u.type)}
                className="p-1 rounded-full hover:bg-red-500 hover:text-white transition"
                title="Delete"
              >
                <Trash size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
