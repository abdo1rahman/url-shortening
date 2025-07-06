import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";

export default function HamNav({ activeMenu, setActiveMenu }) {
  const dropdownRef = useRef(null);
  const hamArrow1Ref = useRef(null);
  const hamArrow2Ref = useRef(null);

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
        onClick={() => {
          setActiveMenu(activeMenu === "features" ? "" : "features");
          if (hamArrow1Ref.current) {
            hamArrow1Ref.current.classList.toggle("rotate");
          }
          if (hamArrow2Ref.current) {
            hamArrow2Ref.current.classList.remove("rotate");
          }
        }}
      >
        <div className="arrowed-title">
          <span className="list-title">Features</span>
          <svg
            className="ham-arrow"
            id="ham-arrow1"
            ref={hamArrow1Ref}
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="7"
          >
            <path fill="none" stroke-width="2" opacity=".75" d="M1 1l4 4 4-4" />
          </svg>
        </div>
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
        onClick={() => {
          setActiveMenu(activeMenu === "resources" ? "" : "resources");
          if (hamArrow1Ref.current) {
            hamArrow1Ref.current.classList.remove("rotate");
          }
          if (hamArrow2Ref.current) {
            hamArrow2Ref.current.classList.toggle("rotate");
          }
        }}
      >
        <div className="arrowed-title">
          <span className="list-title">Resources</span>
          <svg
            className="ham-arrow"
            id="ham-arrow2"
            ref={hamArrow2Ref}
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="7"
          >
            <path fill="none" stroke-width="2" opacity=".75" d="M1 1l4 4 4-4" />
          </svg>
        </div>
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
