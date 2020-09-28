export const arrayToEnumString = (arr) => {
  if (!arr.length) {
    return "";
  }
  let str = arr.join(", ").toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1) + ".";
};

export const stringToArray = (str) => {
  if (!str.length) {
    return [];
  }
  let arr = str.split(",");
  return arr;
};
