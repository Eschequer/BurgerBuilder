import React from "react";
import axios from "../../axios-orders";
import faker from "faker";
import { withErrorHandler } from "../withErrorHandler/withErrorHandler";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
  salad: 2,
  cheese: 5.4,
  meat: 9.8,
  bacon: 11,
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
    readyToOrder: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
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
      });
  }

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
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });
  }

  orderHandler = () => this.setState({ readyToOrder: true });

  cancelOrderHandler = () => this.setState({ readyToOrder: false });

  continueOrderHandler = () => {
    /*this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: faker.name.findName(),
        email: faker.internet.email(),
      },
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.setState({ readyToOrder: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
        this.setState({ readyToOrder: false });
        console.log(error);
      });*/

    const queryParams = [];

    for (let ingredient in this.state.ingredients) {
      if (
        Object.prototype.hasOwnProperty.call(this.state.ingredients, ingredient)
      )
        queryParams.push(
          encodeURIComponent(ingredient) +
            "=" +
            encodeURIComponent(this.state.ingredients[ingredient])
        );
    }

    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledState = { ...this.state.ingredients };
    for (let key in disabledState) {
      disabledState[key] = disabledState[key] <= 0;
    }

    const orderSummary = this.state.loading ? (
      <Spinner />
    ) : (
      <OrderSummary
        ingredients={this.state.ingredients}
        cancelOrder={this.cancelOrderHandler}
        continueOrder={this.continueOrderHandler}
        totalPrice={this.state.totalPrice}
      />
    );

    return (
      <React.Fragment>
        {this.state.ingredients ? (
          <>
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

export default withErrorHandler(BurgerBuilder, axios);
