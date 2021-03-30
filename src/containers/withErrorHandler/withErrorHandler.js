import React from "react";
import Modal from "../../components/UI/Modal/Modal";

export const withErrorHandler = (WrappedComponent, axios) => {
  return class WithErrorHandler extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
        mounted: false,
      };
    }

    componentDidMount() {
      this.reqInterceptor = axios.interceptors.request.use((request) => {
        this.setState({ error: null });

        return request;
      });

      this.resInterceptor = axios.interceptors.response.use(null, (error) => {
        this.setState({ error: error });

        return Promise.reject(error);
      });

      this.setState({ mounted: true });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => this.setState({ error: null });

    render() {
      return (
        <React.Fragment>
          <Modal show={this.state.error} cancel={this.errorConfirmedHandler}>
            {this.state.error?.message}
          </Modal>
          {this.state.mounted ? <WrappedComponent {...this.props} /> : null}
        </React.Fragment>
      );
    }
  };
};
