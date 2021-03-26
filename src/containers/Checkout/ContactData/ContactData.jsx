import React, { Component } from "react";
import axios from "../../../axios-orders";
import faker from "faker";
import styles from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    personalData: {
      name: "",
      email: "",
      address: {
        street: "",
        postalCode: "",
      },
    },
    loading: false,
  };

  orderHandler = () => {
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        address: {
          street: faker.fake("{{address.streetAddress}}"),
          postalCode: faker.fake("{{address.zipCode}}"),
        },
      },
    };

    axios
      .post("/orders.json", order)
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  render() {
    return !this.state.loading ? (
      <div className={styles.ContactData}>
        <h3>Enter your Contact Data</h3>
        <form action="/">
          <input type="text" name="name" placeholder="Enter your name" />
          <input type="email" name="email" placeholder="Enter your email" />
          <input type="text" name="street" placeholder="Enter your street" />
          <input
            type="text"
            name="postal"
            placeholder="Enter your postal code"
          />
          <Button
            btnType="Success"
            clickHandler={this.orderHandler}
            type="button"
          >
            ORDER
          </Button>
        </form>
      </div>
    ) : (
      <Spinner />
    );
  }
}

export default ContactData;
