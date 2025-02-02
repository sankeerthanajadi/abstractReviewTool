import React, { useState } from 'react';
import './doc.css'; // Import the CSS for styling

const DocumentUploadPage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      alert(`File ${file.name} uploaded successfully!`);
    } else {
      alert('Please select a file first!');
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Upload Document</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="file-input-container">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            id="fileInput"
            className="file-input"
          />
          <label htmlFor="fileInput" className="file-label">
            Choose a document
          </label>
        </div>
        {file && (
          <div className="file-preview">
            <p>Selected File: {file.name}</p>
          </div>
        )}
        <button type="submit" className="submit-btn">Upload</button>
      </form>
    </div>
  );
};

export default DocumentUploadPage;
