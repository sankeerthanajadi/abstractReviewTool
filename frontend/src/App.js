import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//  import Display from './frontPage/display'; // Your main component
// import DocUpload from './myProject/doc_upload'; // Your doc_upload component
// import Login from './loginPage/RegistrationForm'

import FileUpload from './tool/fileUpload';  // Correct path and capitalization
import Suggestions from './tool/suggestions';


function App() {

  const [suggestions, setSuggestions] = useState("");

  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Display />} />
    //     <Route path="/myProject/doc_upload" element={<DocUpload />} />
    //   </Routes>
    // </Router>
    // //  <Login/>
    <div className="app-container">
      <h1>Abstract Review Tool</h1>
      <FileUpload setSuggestions={setSuggestions} /> {/* ✅ Capitalized */}
      {suggestions && <Suggestions suggestions={suggestions} />} {/* ✅ Fixed */}
    </div>
  );
}

export default App;
