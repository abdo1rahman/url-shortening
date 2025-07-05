import Navbar from "./components/Navbar.jsx";
import HamNav from "./components/HamNav.jsx";
import Hero from "./components/Hero.jsx";
import UrlForm from "./components/UrlForm.jsx";
import GetStarted from "./components/GetStarted.jsx";

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
        <div className="gray">
          <UrlForm />

          <section className="features-section">
            <div className="features-title">
              <h2>Advanced Statistics</h2>
              <p>
                Track how your links are performing across the web with our
                advanced statistics dashboard.
              </p>
            </div>

            <div className="features">
              <div className="feature" id="feature1">
                <div className="icon" id="icon-brand-rec">
                  <img src="/images/icon-brand-recognition.svg" alt="" />
                </div>
                <h4>Brand Recognition</h4>
                <p>
                  Boost your brand recognition with each click. Generic links
                  don’t mean a thing. Branded links help instil confidence in
                  your content.
                </p>
              </div>

              <div className="feature" id="feature2">
                <div className="icon" id="icon-detailed-rec">
                  <img src="/images/icon-detailed-records.svg" alt="" />
                </div>
                <h4>Detailed Records</h4>
                <p>
                  Gain insights into who is clicking your links. Knowing when
                  and where people engage with your content helps inform better
                  decisions.
                </p>
              </div>

              <div className="feature" id="feature3">
                <div className="icon" id="icon-fully-cust">
                  <img src="/images/icon-fully-customizable.svg" alt="" />
                </div>
                <h4>Fully Customizable</h4>
                <p>
                  Improve brand awareness and content discoverability through
                  customizable links, supercharging audience engagement.
                </p>
              </div>
            </div>
            <hr className="features-ribbon" />
          </section>
        </div>
        <section className="boost">
          <h2>Boost your links today</h2>
          <GetStarted />
        </section>
      </main>
    </div>
  );
}

export default App;
