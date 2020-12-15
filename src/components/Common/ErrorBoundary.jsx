import React from "react";
import InnerPage from "./InnerPage";
import Notification from "./Notification";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
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
