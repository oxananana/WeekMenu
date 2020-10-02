import PropTypes from "prop-types";

export const dishPropTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  isDone: PropTypes.bool,
  imgSrc: PropTypes.string,
  categoryId: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  schedule: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string,
      isActive: PropTypes.bool,
    })
  ),
  recipe: PropTypes.string,
};

export const dishDefaultProps = {
  dish: {
    id: "",
    title: "",
    isDone: false,
    imgSrc: "",
    ingredients: [],
    categoryId: "",
    schedule: [],
    recipe: "",
  },
};
