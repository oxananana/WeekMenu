const light = {
  primary: "#5D4AC6",
  primaryRgba: "93,74,198",
  primaryHover: "rgba(93,74,198,.8)",

  baseText: "#393746",
  baseTextRgba: "57,55,70",
  baseLightBg: "#fff",
};

export const lightTheme = {
  bg: { base: "#FAF9FD", baseLight: light.baseLightBg, primary: light.primary },
  text: {
    base: light.baseText,
    baseInvert: "#fff",
    navbar: "#fff",
    gray: `rgba(${light.baseTextRgba}, .7)`,
    grayLight: `rgba(${light.baseTextRgba}, .4)`,
    primary: light.primary,
    primaryHover: light.primaryHover,
  },
  border: {
    base: "#efefef",
    input: "#ececec",
    primary: light.primary,
  },
  shadow: {
    base: "2px 4px 4px rgba(0, 0, 0, 0.02);",
  },
};

const dark = {
  primary: "#5D4AC6",
  primaryRgba: "93,74,198",
  primaryHover: "rgba(93,74,198,.8)",

  baseText: "rgba(255,255,255,.7)",
  baseTextRgba: "255,255,255",
  baseLightBg: "rgba(255,255,255,.03)",
};

export const darkTheme = {
  bg: { base: "#39306f", baseLight: dark.baseLightBg, primary: dark.primary },
  text: {
    base: dark.baseText,
    baseInvert: dark.baseTextRgba,
    navbar: dark.baseTextRgba,
    gray: `rgba(${dark.baseTextRgba}, .6)`,
    grayLight: `rgba(${dark.baseTextRgba}, .5)`,
    primary: dark.primary,
    primaryHover: dark.primaryHover,
  },
  border: {
    base: "rgba(255, 255, 255, 0.05)",
    input: "rgba(255, 255, 255, 0.1)",
    primary: dark.primary,
  },
  shadow: {
    base: "2px 4px 4px rgba(0, 0, 0, 0.02);",
  },
};
