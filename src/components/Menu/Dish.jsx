import React from "react";
import styled from "styled-components";
import { shadow } from "../../theme/variables";

const Dish = (props) => {
  const dish = props.dish;
  const { id, title, isDone, imgSrc } = { ...dish };

  return (
    <StyledDish>
      <DishImg style={{ backgroundImage: `url(${imgSrc})` }} />
      <DishTitle>{title}</DishTitle>
    </StyledDish>
  );
};

const StyledDish = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  border-radius: 4px;
  position: relative;

  & + & {
    margin-top: 12px;
  }

  &:hover {
    cursor: pointer;
    box-shadow: ${shadow};
  }
`;

const DishImg = styled.div`
  height: 60px;
  width: 60px;
  background-size: cover;
  background-position: center;
  background-color: #fff;
  border-radius: 4px 0 0 4px;
`;
const DishTitle = styled.div`
  flex: 1;
  padding: 0 16px;
  font-size: 14px;
  max-height: 60px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default Dish;
