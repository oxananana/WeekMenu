// const primary = "#481380";

const light = {
  primary: "#4d37c1",
  primaryRgba: "93,74,198",
  primaryHover: "rgba(93,74,198,.8)",

  baseText: "#393746",
  baseTextRgba: "57,55,70",
  baseLightBg: "#f9f9f9",
};

export const lightTheme = {
  bg: {
    base: "#fff",
    baseLight: light.baseLightBg,
    primary: light.primary,
    pulseStart: "rgba(93,74,198,.2)",
    pulseEnd: "rgba(93,74,198,0)",
    droppable: "rgba(0,0,0,.05)",
    droppableParent: "rgba(0,0,0,.03)",
    error: "#f96262",
    info: "rgba(0,0,0,.02)",
    warning: "#fff2db",
    success: "#ddf7dd",
  },
  text: {
    base: light.baseText,
    baseInvert: "#fff",
    gray: `rgba(${light.baseTextRgba}, .7)`,
    grayLight: `rgba(${light.baseTextRgba}, .4)`,
    primary: light.primary,
    primaryHover: light.primaryHover,
    error: "#f96262",
    info: `rgba(${light.baseTextRgba}, .7)`,
    warning: "orange",
    success: "#179617",
  },
  border: {
    base: "#efefef",
    input: "#ececec",
    primary: light.primary,
  },
  shadow: {
    base: "2px 4px 4px rgba(0, 0, 0, 0.03);",
    navbar: "0 5px 8px -5px rgba(0,0,0,.06)",
    draggable: "2px 2px 5px rgba(0, 0, 0, 0.1);",
  },
  img: {
    overlay: "rgba(0,0,0,.05)",
    overlayImg: "rgba(0,0,0,.5)",
    overlayIcon: "#fff",
  },
};

const dark = {
  primary: "#7b66f1",

  primaryRgba: "93,74,198",
  primaryHover: "rgba(93,74,198,.8)",

  baseText: "rgba(255,255,255,.7)",
  baseTextRgba: "rgb(255,255,255)",
  baseLightBg: "#26282b",
};

export const darkTheme = {
  bg: {
    base: "#2c2e31",
    baseLight: dark.baseLightBg,
    primary: dark.primary,
    pulseStart: "rgba(93,74,198,.4)",
    pulseEnd: "rgba(93,74,198,0)",
    droppable: "rgba(0,0,0,.11)",
    droppableParent: "rgba(0,0,0,.06)",
    error: "#f96262",
    info: "rgba(0,0,0,.1)",
    warning: "#483003",
    success: "#043c04",
  },
  text: {
    base: dark.baseText,
    baseInvert: dark.baseText,
    gray: `rgba(${dark.baseTextRgba}, .5)`,
    grayLight: `rgba(${dark.baseTextRgba}, .5)`,
    primary: dark.primary,
    primaryHover: dark.primaryHover,
    error: "#f96b63",
    info: `rgba(${dark.baseTextRgba}, .5)`,
    warning: "#b97800",
    success: "#007b00",
  },
  border: {
    base: "rgba(255, 255, 255, 0.05)",
    input: "rgba(255, 255, 255, 0.1)",
    primary: dark.primary,
  },
  shadow: {
    base: "2px 4px 4px rgba(0, 0, 0, 0.08);",
    navbar: "0 5px 10px -5px rgba(0,0,0,.2)",
    draggable: "2px 2px 5px rgba(0, 0, 0, 0.15);",
  },
  img: {
    overlay: "rgba(255,255,255,.04)",
    overlayImg: "rgba(0,0,0,.5)",
    overlayIcon: dark.baseText,
  },
};
