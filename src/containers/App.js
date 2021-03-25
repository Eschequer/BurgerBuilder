import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../components/Navigation/SideDrawer/SideDrawer";
import Checkout from "./Checkout/Checkout";

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
        <Switch>
          <Route exact path="/" component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </div>
    );
  }
}

export default App;
