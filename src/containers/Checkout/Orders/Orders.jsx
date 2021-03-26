import React, { Component } from "react";
import axios from "../../../axios-orders";
import Order from "../../../components/Order/Order";
import { withErrorHandler } from "../../withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(({ data }) => {
        const fetchedOrders = [];

        for (let key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            fetchedOrders.push({ ...data[key], id: key });
          }
        }

        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderOrders() {
    return this.state.orders.map((order) => {
      const { customer, price, ingredients, id } = order;
      return (
        <Order
          customerInfo={customer}
          price={price}
          key={id}
          ingredients={ingredients}
        />
      );
    });
  }

  render() {
    return <div style={{ margin: "70px auto" }}>{this.renderOrders()}</div>;
  }
}

export default withErrorHandler(Orders, axios);
