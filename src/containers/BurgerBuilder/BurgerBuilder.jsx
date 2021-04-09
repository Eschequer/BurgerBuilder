import React from "react";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  fetchIngredients,
  initiatePurchase,
} from "../../store/actions";
import { withErrorHandler } from "../withErrorHandler/withErrorHandler";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

export class BurgerBuilder extends React.Component {
  state = {
    readyToOrder: false,
  };

  componentDidMount() {
    this.props.fetchIngredients();
  }

  updatePurchasableState(ingredients) {
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0);
    return sum > 0;
  }

  readyToOrderHandler = () => {
    if (!this.props.isAuthenticated) {
      this.props.history.push("/auth");
    } else {
      this.setState({ readyToOrder: true });
    }
  };

  cancelOrderHandler = () => this.setState({ readyToOrder: false });

  continueOrderHandler = () => {
    this.props.initiatePurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledState = { ...this.props.ingredients };
    for (let key in disabledState) {
      disabledState[key] = disabledState[key] <= 0;
    }

    return (
      <React.Fragment>
        {!this.props.error && this.props.ingredients ? (
          <>
            <Burger ingredients={this.props.ingredients} />
            <BuildControls
              ingredientAdded={this.props.addIngredient}
              ingredientsRemoved={this.props.removeIngredient}
              disabledInfo={disabledState}
              price={this.props.totalPrice}
              purchasable={this.updatePurchasableState(this.props.ingredients)}
              order={this.readyToOrderHandler}
              isAuthenticated={this.props.isAuthenticated}
            />
            <Modal
              show={this.state.readyToOrder}
              cancel={this.cancelOrderHandler}
            >
              <OrderSummary
                ingredients={this.props.ingredients}
                cancelOrder={this.cancelOrderHandler}
                continueOrder={this.continueOrderHandler}
                totalPrice={this.props.totalPrice}
              />
            </Modal>
          </>
        ) : (
          <p style={{ marginTop: "200px", textAlign: "center" }}>
            Ingredients cannot be loaded!
          </p>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
}

export default connect(mapStateToProps, {
  addIngredient,
  removeIngredient,
  fetchIngredients,
  initiatePurchase,
})(withErrorHandler(BurgerBuilder, axios));
