import React from "react";
import styled from "styled-components";
import Dish from "./Dish";

const Category = (props) => {
  const { dishes, selectDish, selectedDishes } = { ...props };

  return (
    <StyledCategory>
      {dishes.length > 0 ? (
        <DishesList>
          {dishes.map((dish) => {
            return (
              <Dish
                id={dish.id}
                key={dish.id}
                title={dish.title}
                imgSrc={dish.imgSrc}
                selectDish={selectDish}
                isActive={selectedDishes.includes(dish.id)}
              />
            );
          })}
        </DishesList>
      ) : (
        <div>Здесь пока нет рецептов</div>
      )}
    </StyledCategory>
  );
};

const StyledCategory = styled.div`
  flex: 1;
  & + & {
    margin-top: 32px;
  }
`;

const DishesList = styled.div``;

export default Category;
