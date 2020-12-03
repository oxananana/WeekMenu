import React from "react";
import styled from "styled-components";
import Icon from "../../Common/Icon";

const Dish = (props) => {
  const { id, title, imgSrc, isActive, selectDish } = props;

  return (
    <StyledDish
      isActive={isActive}
      onClick={() => {
        selectDish(id);
      }}
    >
      {imgSrc ? (
        <DishImg style={{ backgroundImage: `url(${imgSrc})` }} />
      ) : (
        <ImgPlaceholder>
          <Icon name="camera" />
        </ImgPlaceholder>
      )}
      <div>
        <DishTitle>{title}</DishTitle>
      </div>
      {isActive && (
        <CheckedIcon>
          <Icon name="check" />
        </CheckedIcon>
      )}
    </StyledDish>
  );
};

const StyledDish = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.bg.base};
  position: relative;
  padding-right: 48px;
  border-radius: 4px;
  color: ${({ theme, isActive }) => isActive && theme.text.primary};

  & + & {
    margin-top: 12px;
  }

  &:hover {
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadow.base};
  }
`;

const imgContainerCss = `
  border-radius: 4px 0 0 4px;
  height: 60px;
  width: 60px;
  min-width: 60px;
  margin-right: 12px;
`;

const DishImg = styled.div`
  ${imgContainerCss};
  border-right: 1px solid ${({ theme }) => theme.bg.baseLight};
  background-size: cover;
  background-position: center;
  background-color: ${({ theme }) => theme.bg.base};
`;

const ImgPlaceholder = styled.div`
  ${imgContainerCss};
  border-right: 1px solid ${({ theme }) => theme.bg.baseLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.bg.baseLight};
  svg {
    width: 32px;
    height: 32px;
  }
`;

const DishTitle = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CheckedIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 18px;
  color: ${({ theme }) => theme.bg.primary};

  svg {
    height: 24px;
    width: 24px;
  }
`;

export default Dish;
