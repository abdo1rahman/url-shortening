import HamBtn from "./HamBtn.jsx";

import { motion, AnimatePresence } from "motion/react";
import { useRef, useEffect } from "react";

const THRESHOLD = 768;

export default function Navbar({
  navOpen,
  activeMenu,
  setActiveMenu,
  windowWidth,
  toggleNav,
}) {
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveMenu("");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setActiveMenu]);
  return (
    <nav>
      <div className="nav-start">
        <img src="/images/logo.svg" alt="Shortly logo" className="logo" />
        {windowWidth > THRESHOLD ? (
          <div className="links" ref={dropdownRef}>
            <div
              className="menu"
              onClick={() =>
                setActiveMenu(activeMenu === "features" ? "" : "features")
              }
            >
              <div className="list-title">
                <span>Features</span>
                <svg
                  className="arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="7"
                >
                  <path
                    fill="none"
                    stroke-width="2"
                    opacity=".75"
                    d="M1 1l4 4 4-4"
                  />
                </svg>
              </div>

              <AnimatePresence>
                {activeMenu === "features" && (
                  <motion.div
                    key="modal"
                    exit={{ opacity: 0 }}
                    className="dropdown-menu"
                  >
                    <p className="list-item">Link Shortening</p>
                    <p className="list-item">Branded Links</p>
                    <p className="list-item">Analytics</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="menu" id="pricing">
              Pricing
            </div>
            <div
              className="menu"
              onClick={() => {
                setActiveMenu(activeMenu === "resources" ? "" : "resources");
                document.getElementById("arrow2").classList.toggle("rotate");
              }}
            >
              <div className="list-title">
                <span>Resources</span>
                <svg
                  className="arrow"
                  id="arrow2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="7"
                >
                  <path
                    fill="none"
                    stroke-width="2"
                    opacity=".75"
                    d="M1 1l4 4 4-4"
                  />
                </svg>
              </div>

              <AnimatePresence>
                {activeMenu === "resources" && (
                  <motion.div
                    key="modal"
                    exit={{ opacity: 0 }}
                    className="dropdown-menu"
                  >
                    <p className="list-item">Blog</p>
                    <p className="list-item">Developers</p>
                    <p className="list-item">Support</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <HamBtn navOpen={navOpen} toggleNav={toggleNav} />
        )}
      </div>
      {windowWidth > THRESHOLD && (
        <div className="nav-end">
          <button className="login nav-btn">Login</button>
          <button className="signup nav-btn">Sign Up</button>
        </div>
      )}
    </nav>
  );
}
