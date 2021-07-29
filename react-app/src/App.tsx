import React, { useState } from "react";
import World from "./components/globe";
import Toggle from "./components/toggle";

function App() {
  const [mode, setMode] = useState(true);
  return (
    <div className="App">
      <Toggle setMode={setMode} mode={mode} />
      <World mode={mode} />
    </div>
  );
}

export default App;
