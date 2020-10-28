const breakpoints = {
  xlarge: "1400px",
  large: "1024px",
  medium: "568px",
  small: "375px",
};

const mediaQuery = {
  greaterThen: (breakpoint) => {
    return (style) =>
      `@media (min-width: ${breakpoints[breakpoint]}) { ${style} }`;
  },
  lessThen: (breakpoint) => {
    return (style) =>
      `@media (max-width: ${breakpoints[breakpoint]}) { ${style} }`;
  },
};

export default mediaQuery;
