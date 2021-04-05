import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { checkAuthState } from "../store/actions";
import "./App.css";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../components/Navigation/SideDrawer/SideDrawer";
import Checkout from "./Checkout/Checkout";
import Orders from "./Checkout/Orders/Orders";
import Auth from "./Auth/Auth";
import Logout from "../components/Logout/Logout";

class App extends React.Component {
  state = { showSideDrawer: false };

  componentDidMount() {
    this.props.checkAuthState();
  }

  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleSideDrawerHandler = () =>
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });

  render() {
    const renderRoutes = () => {
      if (this.props.isAuthenticated) {
        return (
          <Switch>
            <Route exact path="/" component={BurgerBuilder} />
            <Route path="/orders" component={Orders} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={Auth} />
            <Redirect to="/" />
          </Switch>
        );
      }

      return (
        <Switch>
          <Route exact path="/" component={BurgerBuilder} />
          <Route path="/auth" component={Auth} />
          <Redirect to="/" />
        </Switch>
      );
    };

    return (
      <div className="App">
        <Toolbar toggleSidebar={this.toggleSideDrawerHandler} />
        <SideDrawer
          close={this.closeSideDrawerHandler}
          open={this.state.showSideDrawer}
        />
        {renderRoutes()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.token !== null,
  };
}

export default connect(mapStateToProps, { checkAuthState })(App);
