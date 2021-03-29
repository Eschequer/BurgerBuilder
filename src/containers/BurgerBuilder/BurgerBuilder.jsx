import React from "react";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  addToTotalPrice,
  subtractFromTotalPRice,
} from "../../store/actions";
import { withErrorHandler } from "../withErrorHandler/withErrorHandler";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

class BurgerBuilder extends React.Component {
  state = {
    readyToOrder: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    /*axios
      .get("/ingredients.json")
      .then(({ data }) => {
        this.setState({
          ingredients: {
            salad: data.salad,
            cheese: data.cheese,
            bacon: data.bacon,
            meat: data.meat,
          },
        });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });*/
  }

  /* addIngredient = (type) => {
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
  };*/

  updatePurchasableState(ingredients) {
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0);
    return sum > 0;
  }

  readyToOrderHandler = () => this.setState({ readyToOrder: true });

  cancelOrderHandler = () => this.setState({ readyToOrder: false });

  continueOrderHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledState = { ...this.props.ingredients };
    for (let key in disabledState) {
      disabledState[key] = disabledState[key] <= 0;
    }

    const orderSummary = this.state.loading ? (
      <Spinner />
    ) : (
      <OrderSummary
        ingredients={this.props.ingredients}
        cancelOrder={this.cancelOrderHandler}
        continueOrder={this.continueOrderHandler}
        totalPrice={this.props.totalPrice}
      />
    );

    return (
      <React.Fragment>
        {this.props.ingredients ? (
          <>
            <Burger ingredients={this.props.ingredients} />
            <BuildControls
              ingredientAdded={this.props.addIngredient}
              ingredientsRemoved={this.props.removeIngredient}
              addToPrice={this.props.addToTotalPrice}
              subtractFromPrice={this.props.subtractFromTotalPRice}
              disabledInfo={disabledState}
              price={this.props.totalPrice}
              purchasable={this.updatePurchasableState(this.props.ingredients)}
              order={this.readyToOrderHandler}
            />
            <Modal
              show={this.state.readyToOrder}
              cancel={this.cancelOrderHandler}
            >
              {orderSummary}
            </Modal>
          </>
        ) : this.state.error ? (
          <p style={{ marginTop: "200px", textAlign: "center" }}>
            Ingredients cannot be loaded!
          </p>
        ) : (
          <Spinner />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
}

export default connect(mapStateToProps, {
  addIngredient,
  removeIngredient,
  addToTotalPrice,
  subtractFromTotalPRice,
})(withErrorHandler(BurgerBuilder, axios));
