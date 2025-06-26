import { motion, AnimatePresence } from "motion/react";
import { useRef, useEffect } from "react";
const THRESHOLD = 768;

export default function Navbar({
  navOpen,
  activeMenu,
  setActiveMenu,
  windowWidth,
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
        <div className="links" ref={dropdownRef}>
          <div
            className="menu"
            onClick={() =>
              setActiveMenu(activeMenu === "features" ? "" : "features")
            }
          >
            <span className="list-title">Features</span>
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
            onClick={() =>
              setActiveMenu(activeMenu === "resources" ? "" : "resources")
            }
          >
            <span className="list-title">Resources</span>
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
      </div>
      <div className="nav-end">
        <button className="login nav-btn">Login</button>
        <button className="signup nav-btn">Sign Up</button>
      </div>
    </nav>
  );
}
