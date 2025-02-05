import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa"; // Importing icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { motion } from "framer-motion";
import { FaFileAlt, FaCheckCircle } from "react-icons/fa";
import { MdCloudUpload, MdOutlineTipsAndUpdates } from "react-icons/md";
import './style.css'; // Import the CSS file

const Display = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      navbarRef.current &&
      !navbarRef.current.contains(event.target)
    ) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const navigateTo = (url) => {
    navigate(url);
  };

  const [uploaded, setUploaded] = useState(false);
  const [suggestions, setSuggestions] = useState(false);

  useEffect(() => {
    setTimeout(() => setUploaded(true), 4000);
    setTimeout(() => setSuggestions(true), 8000);
  }, []);

  return (
    <div className="page">
      <nav ref={navbarRef} className="navbar">
        <FaBars className="menuIcon" onClick={toggleSidebar} />
        <h1 className="brand">Automated Abstract Review Tool</h1>
        <div className="icons">
          <FaBell className="icon" />
          <FaUserCircle className="icon" />
        </div>
      </nav>
      <div
        ref={sidebarRef}
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
      >
        <p className="sidebarItem" onClick={() => navigateTo("/home")}>Home</p>
        <p className="sidebarItem" onClick={() => navigateTo("/myProject/doc_upload")}>My Project</p>
        <p className="sidebarItem" onClick={() => navigateTo("/messages")}>Messages</p>
        <p className="sidebarItem" onClick={() => navigateTo("/info")}>Info About Class</p>
        <p className="sidebarItem" onClick={() => navigateTo("/settings")}>Settings</p>
      </div>

      <div className="content">
       <span className="heading">Want to improve the quality of your abstract?? </span>
       <span className="heading"> Get it done at the best available . . .</span>

        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {!uploaded ? (
            <motion.div
              className="animationStep"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 5 }}
            >
              <MdCloudUpload className="iconUpload" />
              <h2 className="stepTitle">1. Upload your document</h2>
            </motion.div>
          ) : suggestions ? (
            <motion.div
              className="animationStep"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 5 }}
            >
              <MdOutlineTipsAndUpdates className="iconUpdate" />
              <h2 className="stepTitle">3. Generate the best suggestions</h2>
              <ul className="suggestionsList">
                <li>- Improve formatting for clarity</li>
                <li>- Add more references</li>
                <li>- Check grammar and spelling</li>
              </ul>
            </motion.div>
          ) : (
            <motion.div
              className="animationStep"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5 }}
            >
              <FaCheckCircle className="iconCheck" />
              <h2 className="stepTitle">2. AI Scanning</h2>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Display;
