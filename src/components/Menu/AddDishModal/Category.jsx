import React from "react";
import styled from "styled-components";
import Dish from "./Dish";

const Category = (props) => {
  const { dishes, selectDish, selectedDishesIds } = { ...props };

  return (
    <StyledCategory>
      {dishes.length > 0 ? (
        <Dishes>
          {dishes.map((dish) => {
            return (
              <Dish
                id={dish.id}
                key={dish.id}
                title={dish.title}
                imgSrc={dish.imgSrc}
                schedule={dish.schedule}
                selectDish={selectDish}
                isActive={selectedDishesIds.includes(dish.id)}
              />
            );
          })}
        </Dishes>
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

const Dishes = styled.div``;

export default Category;
