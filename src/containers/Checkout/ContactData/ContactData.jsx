import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../../axios-orders";
import { checkValidity } from "../../utility";
import styles from "./ContactData.module.css";
import { purchaseBurger } from "../../../store/actions";
import { withErrorHandler } from "../../withErrorHandler/withErrorHandler";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Your Name",
          id: "name",
          label: "Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter Your Email",
          id: "email",
          label: "Email",
        },
        value: "",
        validation: {
          required: true,
          validEmail: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Your Country",
          id: "country",
          label: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Your Address",
          id: "address",
          label: "Address",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Your Postal Code",
          id: "zip",
          label: "Postal Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "fastest" },
            { value: "cheapest", displayValue: "cheapest" },
            { value: "normal", displayValue: "normal" },
          ],
          id: "delivery",
          label: "Delivery",
          name: "delivery",
        },
        value: "fastest",
        touched: false,
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};

    for (let orderFormProp in this.state.orderForm) {
      formData[orderFormProp] = this.state.orderForm[orderFormProp].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.purchaseBurger(order);
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;

    for (let updatedFormElement in updatedOrderForm) {
      formIsValid = updatedOrderForm[updatedFormElement].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  render() {
    const renderInputElements = () => {
      return Object.entries(this.state.orderForm).map(([key, element]) => {
        return (
          <Input
            key={key}
            elementType={element.elementType}
            elementConfig={element.elementConfig}
            value={element.value}
            invalid={element.valid}
            touched={element.touched}
            changeHandler={(event) => this.inputChangeHandler(event, key)}
          />
        );
      });
    };

    renderInputElements();

    return !this.props.loading ? (
      <div className={styles.ContactData}>
        <h3>Enter your Contact Data</h3>
        <form action="/" onSubmit={this.orderHandler}>
          {renderInputElements()}
          <Button
            btnType="Success"
            type="submit"
            disable={!this.state.formIsValid}
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

function mapStateToProps(state) {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.orders.loading,
    userId: state.auth.userId,
  };
}

export default connect(mapStateToProps, { purchaseBurger })(
  withErrorHandler(ContactData, axios)
);
