import React from "react";
import { Redirect } from "react-router-dom";
class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorOccurred: false };
  }

  componentDidCatch(error, info) {
    this.setState({ errorOccurred: true });
    console.log(error, info);
  }

  render() {
    return this.state.errorOccurred ? (
      <Redirect to="/login" />
    ) : (
      this.props.children
    );
  }
}

export default ErrorHandler;
