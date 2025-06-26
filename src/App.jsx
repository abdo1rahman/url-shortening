import Navbar from "./components/Navbar.jsx";

import { useState } from "react";
import "./App.css";

function App() {
  const [activeMenu, setActiveMenu] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  return (
    <div className="app">
      <Navbar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        windowWidth={windowWidth}
      />
    </div>
  );
}

export default App;
