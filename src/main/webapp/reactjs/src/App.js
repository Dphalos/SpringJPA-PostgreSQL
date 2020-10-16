import React from "react";
import "./App.css";
import Openmap from "./components/Openmap";
import ThreeJs from "./components/ThreeJs";

function App() {
  return (
    <div className="App">
      <ThreeJs />
      <Openmap />
    </div>
  );
}

export default App;
