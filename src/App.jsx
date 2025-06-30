import Navbar from "./components/Navbar.jsx";
import HamNav from "./components/HamNav.jsx";

import { useState, useEffect } from "react";
import "./App.css";

const THRESHOLD = 768;

function App() {
  const [navOpen, toggleNav] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > THRESHOLD) toggleNav(false);
    };

    // Listen for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app">
      <Navbar
        navOpen={navOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        windowWidth={windowWidth}
        toggleNav={toggleNav}
      />
      {navOpen && (
        <HamNav activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      )}
    </div>
  );
}

export default App;
