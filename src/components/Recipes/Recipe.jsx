import React from "react";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import mediaQuery from "../../theme/mediaQuery";
// import cn from "classnames";
// import { weekDaysNamesRU } from "../../constants";
import { arrayToEnumString } from "../../helpers/helpers";
import Icon from "../Common/Icon";

const Recipe = (props) => {
  const {
    id,
    title,
    imgSrc,
    categoryId,
    schedule,
    ingredients = [],
  } = props.recipe;

  return (
    <RecipeLink to={`/recipes/${categoryId}/${id}`}>
      {imgSrc ? (
        <RecipeImg style={{ backgroundImage: `url(${imgSrc})` }} />
      ) : (
        <RecipeImgPlaceholder>
          <Icon name="camera"></Icon>
        </RecipeImgPlaceholder>
      )}
      <RecipeInfo>
        <RecipeTitle>{title}</RecipeTitle>
        {/* <RecipeSchedule>
          {weekDaysNamesRU.map((day, index) => {
            const isActive = schedule && schedule[day];

            return (
              <RecipeScheduleItem
                key={index}
                className={cn({ active: isActive })}
              >
                {day}
              </RecipeScheduleItem>
            );
          })}
        </RecipeSchedule> */}
        <RecipeIngredients>
          {ingredients.length > 0
            ? arrayToEnumString(ingredients)
            : "Не заполнено"}
        </RecipeIngredients>
      </RecipeInfo>
    </RecipeLink>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.object,
};

Recipe.defaultProps = {
  recipe: {
    schedule: [],
    ingredients: [],
  },
};

const RecipeLink = styled(NavLink)`
  background-color: ${({ theme }) => theme.bg.base};
  border-radius: 8px;
  flex: auto;
  width: 100%;
  transition: transform 0.2s ease-out;

  & + & {
    margin-left: 20px;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.base};
    transform: translateY(-10px);
  }
`;

const imgContainerCss = `
  height: 220px;
  border-radius: 8px 8px 0 0;

  ${mediaQuery.greaterThen("xlarge")`
    height: 250px;
  `}
`;

const fade = keyframes`
 0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const RecipeImg = styled.div`
  ${imgContainerCss};
  border-bottom: 1px solid ${({ theme }) => theme.bg.baseLight};
  animation: ${fade} 0.2s ease-out;
  background-size: cover;
  background-position: center;
`;

const RecipeImgPlaceholder = styled.div`
  ${imgContainerCss};
  border-bottom: 1px solid ${({ theme }) => theme.bg.baseLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.bg.baseLight};

  svg {
    width: 68px;
    height: 68px;
  }
`;

const RecipeInfo = styled.div`
  padding: 20px;
`;

const RecipeTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 12px;
`;

// const RecipeSchedule = styled.ul`
//   display: flex;
//   margin: 12px -4px;
// `;

// const RecipeScheduleItem = styled.li`
//   margin: 0 4px;
//   color: ${({ theme }) => theme.text.gray};

//   &.active {
//     color: ${({ theme }) => theme.text.base};
//   }
// `;

const RecipeIngredients = styled.div`
  color: ${({ theme }) => theme.text.gray};
`;

export default Recipe;
