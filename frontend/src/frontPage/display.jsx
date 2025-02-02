import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa"; // Importing icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Display = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navbarRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate function

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
    navigate(url); // Use navigate instead of window.location.href
  };

  return (
    <div style={styles.page}>
      <nav ref={navbarRef} style={styles.navbar}>
        <FaBars style={styles.menuIcon} onClick={toggleSidebar} />
        <h1 style={styles.brand}>Automated Abstract Review Tool</h1>
        <div style={styles.icons}>
          <FaBell style={styles.icon} />
          <FaUserCircle style={styles.icon} />
        </div>
      </nav>
      <div
        ref={sidebarRef}
        style={{
          ...styles.sidebar,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <p style={styles.sidebarItem} onClick={() => navigateTo("/home")}>
          Home
        </p>
        <p
          style={styles.sidebarItem}
          onClick={() => navigateTo("/myProject/doc_upload")}
        >
          My Project
        </p>
        <p style={styles.sidebarItem} onClick={() => navigateTo("/messages")}>
          Messages
        </p>
        <p style={styles.sidebarItem} onClick={() => navigateTo("/info")}>
          Info About Class
        </p>
        <p style={styles.sidebarItem} onClick={() => navigateTo("/settings")}>
          Settings
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "#F2E2D7", // Lighter baby blue
    height: "100vh",
    margin: 0,
    position: "relative", // Ensure other content can stay in place
  },
  navbar: {
    backgroundColor: "white",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 0px 15px 3px #F2E2D7", // Neon cyan glow effect
    zIndex: 10, // Ensure navbar is always on top of the page content
    position: "relative",
  },
  menuIcon: {
    fontSize: "24px",
    cursor: "pointer",
    color: "#333",
    marginRight: "10px",
  },
  brand: {
    margin: 0,
    fontFamily: 'cursive',
    fontSize: "24px",
    color: "#333",
  },
  icons: {
    display: "flex",
    gap: "15px",
  },
  icon: {
    fontSize: "24px",
    color: "#333",
    cursor: "pointer",
    textShadow: "0px 0px 10px #F2E2D7", // Neon glow on icons
  },
  sidebar: {
    position: "fixed", // Position fixed relative to the screen
    top: "60px", // Sidebar starts just below the navbar
    left: "0", // Initially on the left side of the screen
    width: "200px", // Set width of the sidebar
    height: "calc(100vh - 60px)", // Adjust to take up the remaining height below the navbar
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "5px 0px 10px #F2E2D7",
    padding: "10px", // Reduced padding for less spacing
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    transition: "transform 0.3s ease-in-out", // Smooth slide-in/out transition
    zIndex: 5, // Ensure sidebar is above the page content
  },
  sidebarItem: {
    fontSize: "16px", // Slightly smaller text
    cursor: "pointer",
    textAlign: "center",
    padding: "6px 0", // Further reduced spacing
  },
};

export default Display;
