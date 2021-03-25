import React, { Component } from "react";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";

const ingredients = {
  salad: 1,
  cheese: 1,
  bacon: 1,
  meat: 1,
};

class Checkout extends Component {
  cancelCheckoutHandler = () => this.props.history.goBack();

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          cancelCheckoutHandler={this.cancelCheckoutHandler}
        />
      </div>
    );
  }
}

export default Checkout;
