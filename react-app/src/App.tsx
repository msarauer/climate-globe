import React, { useState } from "react";
import World from "./components/globe";
import ControlsBox from "./components/ControlsBox";

function App() {
  const [mode, setMode] = useState(true);
  return (
    <div className="App">
      <ControlsBox mode={mode} setMode={setMode} />
      <World mode={mode} />
    </div>
  );
}

export default App;
