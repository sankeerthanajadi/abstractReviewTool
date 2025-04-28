import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
 import Display from './frontPageStudent/display'; // Your main component
//import DocUpload from './myProject/doc_upload'; // Your doc_upload component
import Login from './loginPage/RegistrationForm'
 import { SuggestionsProvider } from "./tool/SuggestionsContext"; 
import Guide from './guideInterface/guide'
import Coord from './coordinator/coordinatorPage'
 import FileUpload from './tool/fileUpload';  
 import Suggestions from './tool/suggestions';


function App() {

  const [suggestions, setSuggestions] = useState(null);
    
  //   <SuggestionsProvider>
  //     <Router>
  //       <Routes>
  //         <Route path="/" element={<Login />} />
  //         <Route path="/frontPageStudent/display" element={<Display/>} />
  //         <Route path="/guideInterface/guide" element={<Guide/>} />
  //         <Route path="/coordinator/coordinatorPage" element={<Coord/>} />
  //         <Route path="/tool/fileupload" element={<FileUpload />} />
  //         <Route path="/tool/suggestions" element={<Suggestions />} />
  //       </Routes>
  //     {/* <div className="app-container">
  //       <h1>Abstract Review Tool</h1>
  //       <FileUpload setSuggestions={setSuggestions} />
  //       {suggestions && <Suggestions suggestions={suggestions} />}
  //     </div> */}
  //     {location.pathname.includes("/tool") && (
  //       <div className="app-container">
  //         <h1>Abstract Review Tool</h1>
  //         <FileUpload setSuggestions={setSuggestions} />
  //         {suggestions && <Suggestions suggestions={suggestions} />}
  //       </div>
  //     )}
  //     </Router>
  //   </SuggestionsProvider>
  // );

  return (
    <SuggestionsProvider>
      <Router>
        <MainRoutes />
      </Router>
    </SuggestionsProvider>
  );
}

function MainRoutes() {
  const [suggestions, setSuggestions] = useState(null);
  const location = useLocation(); // ✅ Correct way to get the current route

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/frontPageStudent/display" element={<Display />} />
        <Route path="/guideInterface/guide" element={<Guide />} />
        <Route path="/coordinator/coordinatorPage" element={<Coord />} />
        <Route path="/tool/fileupload" element={<FileUpload />} />
        <Route path="/tool/suggestions" element={<Suggestions />} />
      </Routes>

      
      {location.pathname === "/tool/fileupload" && (
        <div className="app-container">
          
          <FileUpload setSuggestions={setSuggestions} />
        </div>
      )}

      
      {location.pathname === "/tool/suggestions" && suggestions && (
        <div className="app-container">
          <h1>AI Suggestions</h1>
          <Suggestions suggestions={suggestions} />
        </div>
      )}

    </>
  );

}

export default App;
