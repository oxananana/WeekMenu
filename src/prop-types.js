import PropTypes from "prop-types";

export const dishPropTypes = {
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
  categoryId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  schedule: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  ingredients: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
  isDone: PropTypes.bool.isRequired,
};

export const recipePropTypes = {
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
  categoryId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  schedule: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  ingredients: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
};

export const categoriesPropTypes = PropTypes.objectOf(
  PropTypes.exact({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
  })
);
