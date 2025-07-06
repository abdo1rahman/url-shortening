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
  const arrow1Ref = useRef(null);
  const arrow2Ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveMenu("");
        let arrows = document.querySelectorAll(".arrow");
        arrows.forEach((arrow) => arrow.classList.remove("rotate"));
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
              onClick={() => {
                setActiveMenu(activeMenu === "features" ? "" : "features");
                if (arrow1Ref.current) {
                  arrow1Ref.current.classList.toggle("rotate");
                }
                if (arrow2Ref.current) {
                  arrow2Ref.current.classList.remove("rotate");
                }
              }}
            >
              <div className="list-title">
                <span>Features</span>
                <svg
                  className="arrow"
                  id="arrow1Ref"
                  ref={arrow1Ref}
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
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    style={{ transformOrigin: "top" }}
                    transition="0.1s"
                    className="dropdown-menu"
                  >
                    <p className="nav-link">Link Shortening</p>
                    <p className="nav-link">Branded Links</p>
                    <p className="nav-link">Analytics</p>
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
                if (arrow1Ref.current) {
                  arrow1Ref.current.classList.remove("rotate");
                }
                if (arrow2Ref.current) {
                  arrow2Ref.current.classList.toggle("rotate");
                }
              }}
            >
              <div className="list-title">
                <span>Resources</span>
                <svg
                  className="arrow"
                  id="arrow2Ref"
                  ref={arrow2Ref}
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
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    style={{ transformOrigin: "top" }}
                    className="dropdown-menu"
                  >
                    <p className="nav-link">Blog</p>
                    <p className="nav-link">Developers</p>
                    <p className="nav-link">Support</p>
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
