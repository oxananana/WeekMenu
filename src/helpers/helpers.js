export const arrayToEnumString = (array) => {
  let str = array.join(", ").toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1) + ".";
};
