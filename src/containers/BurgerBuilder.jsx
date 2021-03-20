import React from "react";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 2,
  cheese: 5.4,
  meat: 9.8,
  bacon: 11,
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 0,
    purchasable: false,
    readyToOrder: false,
  };

  addIngredient = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type] + this.state.totalPrice;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: +priceAddition.toFixed(2),
    });

    this.updatePurchasableState(updatedIngredients);
  };

  removeIngredient = (type) => {
    if (this.state.ingredients[type] <= 0) return;

    const updatedCount = this.state.ingredients[type] - 1;

    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const priceAddition = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: +priceAddition.toFixed(2),
    });

    this.updatePurchasableState(updatedIngredients);
  };

  updatePurchasableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });
  }

  orderHandler = () => this.setState({ readyToOrder: true });

  cancelOrderHandler = () => this.setState({ readyToOrder: false });

  continueOrderHandler = () => alert("Continue to order");

  render() {
    const disabledState = { ...this.state.ingredients };
    for (let key in disabledState) {
      disabledState[key] = disabledState[key] <= 0;
    }

    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredient}
          ingredientsRemoved={this.removeIngredient}
          disabledInfo={disabledState}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          order={this.orderHandler}
        />
        <Modal
          show={this.state.readyToOrder}
          cancelOrder={this.cancelOrderHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            cancelOrder={this.cancelOrderHandler}
            continueOrder={this.continueOrderHandler}
            totalPrice={this.state.totalPrice}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
