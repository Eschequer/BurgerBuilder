import React from "react";
import BurgerBuilder from "./containers/BurgerBuilder";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";

function App() {
  return (
    <div className="App">
      <Toolbar />
      <BurgerBuilder />
    </div>
  );
}

export default App;
