import PropTypes from "prop-types";

export const recipePropTypes = {
  id: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  imgSrc: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  schedule: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  ingredients: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
};
