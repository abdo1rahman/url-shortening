import GetStarted from "./GetStarted.jsx";
export default function Hero() {
  const THRESHOLD = 768;
  return (
    <div className="hero">
      <div className="hero-txt">
        <h1 className="hero-title">More than just shorter links</h1>
        <p className="hero-desc">
          Build your brand’s recognition and get detailed insights on how your
          links are performing.
        </p>
        <GetStarted />
      </div>
      <img
        src="/images/illustration-working.svg"
        alt="Person working on computer"
        className="hero-img"
      />
    </div>
  );
}
