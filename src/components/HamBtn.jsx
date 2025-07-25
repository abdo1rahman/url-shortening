import "./HamBtn.css";

export default function HamBtn({ navOpen, toggleNav }) {
  function toggleState() {
    toggleNav((prev) => !prev);
    document.querySelector(".app").classList.toggle("no-scroll");
  }

  return (
    <button className="ham-btn" onClick={toggleState}>
      <div className={`bars ${navOpen ? "rotate-down" : ""}`} />
      <div className={`bars ${navOpen ? "disappear" : ""}`} />
      <div className={`bars ${navOpen ? "rotate-up" : ""}`} />
    </button>
  );
}
