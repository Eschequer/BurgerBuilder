import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { auth } from "../../store/actions/authActions";
import { checkValidity } from "../utility";
import styles from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    authForm: {
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
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter Your Password",
          id: "password",
          label: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    isSignup: true,
  };

  inputChangeHandler = (event, property) => {
    const updatedForm = {
      ...this.state.authForm,
      [property]: {
        ...this.state.authForm[property],
        value: event.target.value,
        touched: true,
        valid: checkValidity(
          event.target.value,
          this.state.authForm[property].validation
        ),
      },
    };

    let formIsValid = true;

    for (let property in updatedForm) {
      formIsValid = updatedForm[property].valid && formIsValid;
    }

    this.setState({ authForm: updatedForm, formIsValid });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.auth(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const renderInputElements = () => {
      return Object.entries(this.state.authForm).map(([key, element]) => {
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

    const renderErrorMessage = () => {
      let message = "";
      let error = this.props.error
        ? this.props.error?.error?.message.slice()
        : "";

      switch (error) {
        case "EMAIL_NOT_FOUND":
          message = "You have entered a wrong email address!";
          break;
        case "INVALID_PASSWORD":
          message = "This password is incorrect!";
          break;
        case "USER_DISABLED":
          message = "This account is disabled!";
          break;
        case "EMAIL_EXISTS":
          message = "This email already exists!";
          break;
        case "OPERATION_NOT_ALLOWED":
          message = "You are not allowed to sign in at the moment!";
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.":
          message = "Too many attempts to sign in! Try again later!";
          break;
        default:
          message = "Something went wrong! Try again later";
          break;
      }

      return this.props.error ? (
        <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>
      ) : null;
    };

    const renderRedirect = () => {
      if (this.props.burgerBuilding) {
        return <Redirect to="/checkout" />;
      }

      return <Redirect to="/" />;
    };

    return this.props.loading ? (
      <Spinner />
    ) : this.props.isAuthenticated ? (
      renderRedirect()
    ) : (
      <form action="/" className={styles.Auth} onSubmit={this.submitHandler}>
        {renderErrorMessage()}
        {renderInputElements()}
        <Button btnType="Success" type="submit">
          {this.state.isSignup ? "Sign Up" : "Sign In"}
        </Button>
        <Button
          btnType="Danger"
          clickHandler={this.switchAuthModeHandler}
          type="button"
        >
          Switch to {this.state.isSignup ? "Sign In" : "Sign Up"}
        </Button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    burgerBuilding: state.burgerBuilder.building,
  };
}

export default connect(mapStateToProps, { auth })(Auth);
