import Navbar from "./components/Navbar.jsx";
import HamNav from "./components/HamNav.jsx";
import Hero from "./components/Hero.jsx";
import UrlForm from "./components/UrlForm.jsx";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            style={{ transformOrigin: "top" }}
            transition={{ duration: 0.2 }}
          >
            <HamNav activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          </motion.div>
        )}
      </AnimatePresence>
      <main>
        <Hero />
        <UrlForm />
      </main>
    </div>
  );
}

export default App;
