import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";

export default function HamNav({ activeMenu, setActiveMenu }) {
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
    <div className="ham-nav" ref={dropdownRef}>
      <div
        className="mobile-menu"
        onClick={() =>
          setActiveMenu(activeMenu === "features" ? "" : "features")
        }
      >
        <span className="list-title">Features</span>
        <div className="ham-links">
          <AnimatePresence>
            {activeMenu === "features" && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                style={{ transformOrigin: "top" }}
                transition={{ duration: 0.2 }}
              >
                <p className="list-item">Link Shortening</p>
                <p className="list-item">Branded Links</p>
                <p className="list-item">Analytics</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="mobile-menu">
        <span className="list-title">Pricing</span>
      </div>
      <div
        className="mobile-menu"
        onClick={() =>
          setActiveMenu(activeMenu === "resources" ? "" : "resources")
        }
      >
        <span className="list-title">Resources</span>
        <div className="ham-links">
          <AnimatePresence>
            {activeMenu === "resources" && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                style={{ transformOrigin: "top" }}
                transition={{ duration: 0.2 }}
              >
                <p className="list-item">Blog</p>
                <p className="list-item">Developers</p>
                <p className="list-item">Support</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <hr />
      <button className="login nav-btn sm-login">Login</button>
      <button className="signup nav-btn sm-signup">Signup</button>
    </div>
  );
}
