import React from "react";
import InnerPage from "./InnerPage";
import Notification from "./Notification";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <InnerPage>
          <Notification type="warning">
            Что-то пошло не так. Попробуйте обновить страницу или зайти позже.
          </Notification>
        </InnerPage>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
