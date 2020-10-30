export const validate = (value, fnArr) => {
  for (const fn of fnArr) {
    const result = fn(value);
    if (result) {
      return result;
    }
  }
  return;
};

export const required = (value) => {
  if (value && value.trim()) {
    return undefined;
  }
  return "Пожалуйста, заполните поле.";
};
