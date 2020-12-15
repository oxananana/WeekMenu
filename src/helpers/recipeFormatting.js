export const arrayToEnumString = (arr) => {
  if (!arr.length) {
    return "";
  }
  let str = arr.join(", ").toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1) + ".";
};

export const separateByCommas = (str) => {
  if (!str.length) {
    return [];
  }
  if (str.endsWith(".")) {
    str = str.slice(0, -1);
  }
  let arr = str.split(",").map((item) => item.trim());
  return arr;
};
