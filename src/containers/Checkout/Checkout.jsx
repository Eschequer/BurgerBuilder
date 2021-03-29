import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  cancelCheckoutHandler = () => this.props.history.goBack();

  continueCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          cancelCheckoutHandler={this.cancelCheckoutHandler}
          continueCheckoutHandler={this.continueCheckoutHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice,
  };
}

export default connect(mapStateToProps)(Checkout);
