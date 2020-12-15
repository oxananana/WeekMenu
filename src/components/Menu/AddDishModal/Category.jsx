import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getCategoryDishes } from "../../../selectors/selectors";
import Dish from "./Dish";

const Category = (props) => {
  const { categoryId, onSelectDish, selectedDishesIds } = props;
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    setDishes(getCategoryDishes(props.dishes, categoryId));
  }, [props.dishes, categoryId]);

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
                onSelectDish={onSelectDish}
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

Category.propTypes = {
  dishes: PropTypes.object,
  categoryId: PropTypes.string,
  selectDish: PropTypes.func,
  selectedDishesIds: PropTypes.array,
};

const StyledCategory = styled.div`
  flex: 1;
`;

const Dishes = styled.div``;

export default Category;
