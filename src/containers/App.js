import React from "react";
import "./App.css";

import BurgerBuilder from "./BurgerBuilder";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../components/Navigation/SideDrawer/SideDrawer";

class App extends React.Component {
  state = { showSideDrawer: false };

  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleSideDrawerHandler = () =>
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });

  render() {
    return (
      <div className="App">
        <Toolbar toggleSidebar={this.toggleSideDrawerHandler} />
        <SideDrawer
          close={this.closeSideDrawerHandler}
          open={this.state.showSideDrawer}
        />
        <BurgerBuilder />
      </div>
    );
  }
}

export default App;
