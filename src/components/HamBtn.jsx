import { useRef } from "react";
import "./HamBtn.css";

export default function HamBtn({ navOpen, toggleNav }) {
  const bar1Ref = useRef(null);
  const bar2Ref = useRef(null);
  const bar3Ref = useRef(null);

  function transform() {
    bar1Ref.current.classList.toggle("rotate-down", !navOpen);
    bar2Ref.current.classList.toggle("disappear", !navOpen);
    bar3Ref.current.classList.toggle("rotate-up", !navOpen);
    toggleNav(!navOpen);
  }

  return (
    <button className="ham-btn" onClick={transform}>
      <div className="bars" id="bar1" ref={bar1Ref} />
      <div className="bars" id="bar2" ref={bar2Ref} />
      <div className="bars" id="bar3" ref={bar3Ref} />
    </button>
  );
}
