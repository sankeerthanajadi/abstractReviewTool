import React, { useState } from "react";
import axios from "axios";

function FileUpload({ setSuggestions }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to process file.");
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Analyze</button>
    </div>
  );
}

export default FileUpload;
