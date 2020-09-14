import dishes from "../JSON/dishes";

export const getDish = (id) => {
  return dishes[id];
};
