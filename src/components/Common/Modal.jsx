import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import mediaQuery from "../../theme/mediaQuery";
import Portal from "./Portal";
import Icon from "./Icon";
import Button from "./Button";

const Modal = (props) => {
  const { title, isOpen, onClose, children, onSubmit } = props;

  const handleClose = () => {
    document.documentElement.style.overflow = null;
    onClose();
  };

  const handleSubmit = () => {
    handleClose();
    onSubmit();
  };

  useLayoutEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    }
  });

  return (
    isOpen && (
      <Portal>
        <ModalContainer>
          <ModalDialog>
            <ModalHeader>
              {title}
              <CloseIcon onClick={handleClose}>
                <Icon name="close" />
              </CloseIcon>
            </ModalHeader>

            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button invert onClick={handleClose}>
                Отмена
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                Добавить
              </Button>
            </ModalFooter>
          </ModalDialog>
          <ModalOverlay onClick={handleClose} />
        </ModalContainer>
      </Portal>
    )
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

Modal.defaultProps = {
  title: "Заголовок",
  isOpen: false,
  onCancel: () => {},
  children: null,
};

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  overflow-y: auto;
  overflow-x: hidden;

  ${mediaQuery.greaterThen("medium")`
    padding:  24px;
  `}

  ${mediaQuery.greaterThen("large")`
    padding: 60px 24px;
  `}
`;

const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ModalDialog = styled.div`
  background-color: ${({ theme }) => theme.bg.baseLight};
  flex: 1;
  max-width: 600px;
  width: 100%;
  position: relative;
  border-radius: 4px;
  z-index: 1;
`;

const ModalHeader = styled.div`
  padding: 16px 32px 16px 16px;
  font-weight: bold;
  font-size: 18px;
  border-bottom: 1px solid ${({ theme }) => theme.border.base};

  ${mediaQuery.greaterThen("medium")`
    padding: 16px 40px 16px 24px;
  `}
`;

const ModalBody = styled.div`
  padding: 16px;

  ${mediaQuery.greaterThen("medium")`
    padding: 24px;
  `}
`;

const ModalFooter = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.border.base};

  ${mediaQuery.greaterThen("medium")`
    padding: 16px 24px;
  `}
`;

const CloseIcon = styled.span`
  display: block;
  position: absolute;
  right: 12px;
  top: 16px;
  color: ${({ theme }) => theme.text.base};
  opacity: 0.5;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  svg {
    display: block;
    width: 16px;
    height: 16px;
  }
`;

export default Modal;
