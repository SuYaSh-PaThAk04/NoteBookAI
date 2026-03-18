import { useState, useEffect } from "react";
import { Upload as UploadIcon } from "lucide-react";
import {
  uploadFile,
  getUploadedFiles,
  uploadYoutubeLink,
  indexText,
  indexWebsite,
} from "../../api/api";
import UploadRes from "./components/UploadRes";
import toast from "react-hot-toast";

export default function Upload() {
  const [activeTab, setActiveTab] = useState("files");
  const [file, setFile] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [text, setText] = useState("");
  const [uploads, setUploads] = useState([]);
  const [indexing, setIndexing] = useState(false);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const data = await getUploadedFiles();
       console.log(data);
        setUploads(data.data);
      } catch (err) {
        console.error("Failed to fetch uploads:", err);
      }
    };
    fetchUploads();
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (activeTab === "files" && file) {
      try {
        setIndexing(true);
        const data = await uploadFile(file);
        toast.success("File Indexed Succesfully")
        setUploads((prev) => [
          ...prev,
          {
            type: data.data.type,
            fileId: data.data.fileId,
            fileName: data.data.fileName,
            pageCount: data.data.pageCount,
          },
        ]);
        setFile(null);
      } catch (err) {
        toast.error("Indexing Failed")
        console.error("Upload error:", err);
      } finally {
        setIndexing(false);
      }
    } else if (activeTab === "youtube" && youtubeLink) {
      try {
        setIndexing(true);
        const data = await uploadYoutubeLink(youtubeLink);
         toast.success("Youtube Link Indexed Succesfully")
        setUploads((prev) => [
          ...prev,
          {
            type: data.data.type,
            name: data.data.videoTitle,
            videoId: data.data.videoId,
          },
        ]);
        setYoutubeLink("");
      } catch (err) {
        toast.error("Indexing Failed")
        console.error("YouTube upload error:", err);
      } finally {
        setIndexing(false);
      }
    } else if (activeTab === "text" && text.trim()) {
      setIndexing(true);
      const data = await indexText(text);
       toast.success("Texts Indexed Succesfully")
      setUploads((prev) => [
        ...prev,
        {
          type: "text",
          name: data.data.text.slice(0, 30) + "...",
          id: data.data.id,
        },
      ]);
      setText("");
      setIndexing(false);
    } else if (activeTab === "website" && websiteLink) {
      try {
        setIndexing(true);
        const data = await indexWebsite(websiteLink);
         toast.success("Web Indexed Succesfully")
        console.log(data);
        
        setUploads((prev) => [
          ...prev,
          {
            type: data.data.type || "web",
            name: data.data.webUrl||websiteLink,
            id: data.data.webId,
          },
        ]);
        setWebsiteLink("");
      } catch (error) {
        toast.error("Indexing Failed")
        console.error("Website upload error:", error);
      } finally {
        setIndexing(false);
      }
    } else {
      toast.error("Please choose resources.")
    }
  };
console.log(uploads);

  return (
    <>
      <div className="p-5 bg-white dark:bg-gray-900 shadow-lg rounded-xl transition-colors duration-300">
        <h2 className="font-bold text-xl text-center mb-5 text-gray-900 dark:text-white">
          Upload Sources
        </h2>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {["files", "youtube", "text", "website"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-3 rounded-lg font-medium transition-all duration-300 text-base
                ${
                  activeTab === tab
                    ? "bg-green-700 text-white shadow"
                    : "bg-green-100 text-green-900 dark:bg-gray-700 dark:text-gray-200 hover:bg-green-200 dark:hover:bg-gray-600"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Conditional Inputs */}
        {activeTab === "files" && (
          <div className="border-2 border-dashed border-green-400 dark:border-green-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 dark:hover:bg-gray-800 transition">
            <UploadIcon size={40} className="text-green-600 dark:text-green-400 mb-2" />
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Drop a file here or{" "}
              <span className="text-green-700 dark:text-green-400 font-semibold">browse</span>
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-600 transition"
            >
              Choose File
            </label>
            {file && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">📄 {file.name}</p>
            )}
          </div>
        )}

        {activeTab === "youtube" && (
          <input
            type="text"
            placeholder="Paste YouTube Link"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            className="border rounded px-3 py-2 w-full mb-4 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        )}

        {activeTab === "website" && (
          <input
            type="text"
            placeholder="Paste Website Link"
            value={websiteLink}
            onChange={(e) => setWebsiteLink(e.target.value)}
            className="border rounded px-3 py-2 w-full mb-4 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        )}

        {activeTab === "text" && (
          <textarea
            placeholder="Enter or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border rounded px-3 py-2 w-full h-32 mb-4 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        )}

        <button
          onClick={handleUpload}
          className="w-full bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
        >
          {indexing ? "Indexing..." : "Upload"}
        </button>
      </div>

      <UploadRes indexing={indexing} uploads={uploads} setUploads={setUploads} />
    </>
  );
}
