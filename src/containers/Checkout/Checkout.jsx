import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 1,
      bacon: 1,
      meat: 1,
    },
    price: 0,
  };

  componentDidMount() {
    const searchParams = new URLSearchParams(this.props.location.search);

    console.log(Object.fromEntries(searchParams));

    const ingredients = {};
    let price = 0;

    for (let [param, val] of searchParams.entries()) {
      if (param === "price") {
        price = +val;
        continue;
      }

      ingredients[param] = +val;
    }
    this.setState({ ingredients, price });
  }

  cancelCheckoutHandler = () => this.props.history.goBack();

  continueCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancelCheckoutHandler={this.cancelCheckoutHandler}
          continueCheckoutHandler={this.continueCheckoutHandler}
          num={this.state.num}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients}
              price={this.state.price}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
