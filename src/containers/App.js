import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../components/Navigation/SideDrawer/SideDrawer";
import Checkout from "./Checkout/Checkout";
import Orders from "./Checkout/Orders/Orders";
import Auth from "./Auth/Auth";
import Logout from "../components/Logout/Logout";

class App extends React.Component {
  state = { showSideDrawer: false, orderName: null };

  setOrderHandler = (orderName) => this.setState({ orderName });

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
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    );
  }
}

export default App;
