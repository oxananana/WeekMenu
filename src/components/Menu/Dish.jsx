import React from "react";
import styled from "styled-components";

import { shadow } from "../../theme/variables";
import { getDish } from "../../selectors/selectors";

const Dish = (props) => {
  const dish = getDish(props.id);

  return (
    <StyledDish>
      <DishImg style={{ backgroundImage: `url(${dish.imgSrc})` }} />
      <DishTitle>{dish.title}</DishTitle>
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
  padding: 8px 16px;
`;

export default Dish;
