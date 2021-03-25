import React, { Component } from "react";
import axios from "../../axios-orders";
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

  cancelCheckoutHandler = () => this.props.history.goBack();

  componentDidMount() {
    if (this.props.orderName) {
      axios
        .get(`/orders/${this.props.orderName}.json`)
        .then(({ data }) => {
          this.setState({ ingredients: data.ingredients });
        })
        .catch((error) => console.log(error));
    }
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancelCheckoutHandler={this.cancelCheckoutHandler}
        />
      </div>
    );
  }
}

export default Checkout;
