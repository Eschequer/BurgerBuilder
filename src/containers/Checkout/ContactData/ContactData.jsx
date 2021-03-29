import React, { Component } from "react";
import axios from "../../../axios-orders";
import styles from "./ContactData.module.css";
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

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.trim().length >= 5 && isValid;
    }

    if (rules.validEmail) {
      let regExp = /@\w+\.\w+/g;
      isValid = regExp.test(value) && isValid;
    }

    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};

    for (let orderFormProp in this.state.orderForm) {
      formData[orderFormProp] = this.state.orderForm[orderFormProp].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
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

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;

    for (let updatedFormElement in updatedOrderForm) {
      console.log(updatedFormElement);
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

    return !this.state.loading ? (
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

export default ContactData;
