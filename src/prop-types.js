import PropTypes from "prop-types";

export const dishPropTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  isDone: PropTypes.bool,
  imgSrc: PropTypes.string,
  categoryId: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  schedule: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  description: PropTypes.string,
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
    description: "",
  },
};

export const categoriesPropTypes = PropTypes.oneOfType([
  PropTypes.oneOf([null]),
  PropTypes.object,
]).isRequired;

export const recipePropTypes = {
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  imgSrc: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  schedule: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  ingredients: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
};
