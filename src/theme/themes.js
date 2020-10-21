// const primary = "#481380";

const light = {
  primary: "#4d37c1",
  primaryRgba: "93,74,198",
  primaryHover: "rgba(93,74,198,.8)",

  baseText: "#393746",
  baseTextRgba: "57,55,70",
  baseLightBg: "#FAF9FD",
};

export const lightTheme = {
  bg: { base: "#fff", baseLight: light.baseLightBg, primary: light.primary },
  text: {
    base: light.baseText,
    baseInvert: "#fff",
    navbar: "#fff",
    gray: `rgba(${light.baseTextRgba}, .7)`,
    grayLight: `rgba(${light.baseTextRgba}, .4)`,
    primary: light.primary,
    primaryHover: light.primaryHover,
    error: "#f96262",
  },
  border: {
    base: "#efefef",
    input: "#ececec",
    primary: light.primary,
  },
  shadow: {
    base: "2px 4px 4px rgba(0, 0, 0, 0.02);",
    navbar: "0 5px 8px -5px rgba(0,0,0,.08)",
  },
  img: {
    overlay: "rgba(0,0,0,.05)",
    overlayImg: "rgba(0,0,0,.4)",
    overlayIcon: "#fff",
  },
};

const dark = {
  primary: "#7b66f1",

  primaryRgba: "93,74,198",
  primaryHover: "rgba(93,74,198,.8)",

  baseText: "rgba(255,255,255,.7)",
  baseTextRgba: "255,255,255",
  baseLightBg: "#26282b",
};

export const darkTheme = {
  bg: {
    base: "#2c2e31",
    baseLight: dark.baseLightBg,
    primary: dark.primary,
  },
  text: {
    base: dark.baseText,
    baseInvert: dark.baseTextRgba,
    navbar: dark.baseTextRgba,
    gray: `rgba(${dark.baseTextRgba}, .5)`,
    grayLight: `rgba(${dark.baseTextRgba}, .5)`,
    primary: dark.primary,
    primaryHover: dark.primaryHover,
    error: "#f99a6b",
  },
  border: {
    base: "rgba(255, 255, 255, 0.05)",
    input: "rgba(255, 255, 255, 0.1)",
    primary: dark.primary,
  },
  shadow: {
    base: "2px 4px 4px rgba(0, 0, 0, 0.02);",
    navbar: "0 5px 10px -5px rgba(0,0,0,.2)",
  },
  img: {
    overlay: "rgba(255,255,255,.04)",
    overlayImg: "rgba(0,0,0,.4)",
    overlayIcon: dark.baseText,
  },
};
