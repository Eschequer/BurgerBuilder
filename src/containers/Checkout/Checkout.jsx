import React, { Component } from "react";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 1,
      bacon: 1,
      meat: 1,
    },
  };

  componentDidMount() {
    const searchParams = new URLSearchParams(this.props.location.search);

    const ingredients = {};
    for (let [param, val] of searchParams.entries()) {
      ingredients[param] = +val;
    }
    this.setState({ ingredients });
  }

  cancelCheckoutHandler = () => this.props.history.goBack();

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancelCheckoutHandler={this.cancelCheckoutHandler}
          num={this.state.num}
        />
      </div>
    );
  }
}

export default Checkout;
