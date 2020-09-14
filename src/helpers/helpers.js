export const ingredientsToString = (ingredients) => {
  let str = ingredients.join(", ").toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1) + ".";
};
