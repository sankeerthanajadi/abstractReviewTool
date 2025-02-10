import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import axios from "axios";
import { useContext } from "react";
import "./file.css";
import { SuggestionsContext } from "./SuggestionsContext";

function FileUpload() {
  const { setSuggestions } = useContext(SuggestionsContext);
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Server Response:", response.data); // Debugging line
      if (response.data.suggestions) {
        setSuggestions(response.data.suggestions);
        navigate("/tool/suggestions");  // Redirect to suggestions page
      } else {
        alert("No suggestions received. Check backend processing.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(`Upload failed: ${error.response?.data?.error || error.message}`);
    }finally {
      setIsLoading(false); // Hide loading message after processing
    }
  };

  return (
    <div className="upload-container">
      <input 
        type="file" 
        accept=".pdf,.docx" 
        onChange={handleFileChange} 
        className="file-input" 
        disabled={isLoading}
      />
      <button 
        onClick={handleUpload} 
        className="upload-button"
        disabled={isLoading}
      >
       {isLoading ? "Scanning..." : "Upload & Analyze"}
      </button>

      {isLoading && <p className="loading-message">AI is scanning your document...</p>}
      
    </div>
  );
}

export default FileUpload;
