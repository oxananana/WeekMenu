import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Icon from "./Icon";

const Notification = (props) => {
  const { type, children } = props;

  return (
    children && (
      <NotificationContainer type={type}>
        <Icon name={type} />
        {children}
      </NotificationContainer>
    )
  );
};

Notification.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Notification.defaultProps = {
  type: "info",
};

const NotificationContainer = styled.div`
  border-radius: 4px;
  background-color: ${({ theme, type }) => theme.bg[type]};
  color: ${({ theme, type }) => theme.text[type]};
  display: flex;
  padding: 12px;

  svg {
    margin-right: 4px;
  }
`;

export default Notification;
