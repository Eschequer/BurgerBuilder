import React, { Component } from "react";
import axios from "../../../axios-orders";
import { connect } from "react-redux";
import { fetchOrders } from "../../../store/actions";
import Order from "../../../components/Order/Order";
import { withErrorHandler } from "../../withErrorHandler/withErrorHandler";
import Spinner from "../../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token);
  }

  renderOrders() {
    return !this.props.loading ? (
      this.props.orders.map((order) => {
        const { orderData, price, ingredients, id } = order;
        return (
          <Order
            customerInfo={orderData}
            price={price}
            key={id}
            ingredients={ingredients}
          />
        );
      })
    ) : (
      <Spinner />
    );
  }

  render() {
    return <div style={{ margin: "70px auto" }}>{this.renderOrders()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    loading: state.orders.loading,
    orders: state.orders.orders,
    token: state.auth.token,
  };
}

export default connect(mapStateToProps, { fetchOrders })(
  withErrorHandler(Orders, axios)
);
