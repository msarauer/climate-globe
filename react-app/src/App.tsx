import React, { useState } from "react";
import World from "./components/globe";
import ControlsBox from "./components/ControlsBox";

function App() {
  const [mode, setMode] = useState(true);
  const [year, setYear] = useState(2018);
  return (
    <div className="App">
      <ControlsBox setYear={setYear} year={year} mode={mode} setMode={setMode} />
      <World year={year} mode={mode} />
    </div>
  );
}

export default App;
