import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Display from './frontPage/display'; // Your main component
import DocUpload from './myProject/doc_upload'; // Your doc_upload component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/myProject/doc_upload" element={<DocUpload />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
