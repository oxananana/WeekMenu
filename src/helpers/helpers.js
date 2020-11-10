import { weekDaysNames } from "../constants";

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
  if (str.endsWith(".")) {
    str = str.slice(0, -1);
  }
  let arr = str.split(",").map((item) => item.trim());
  return arr;
};

export const getWeekDayName = (day) => {
  const date = new Date(day);
  return weekDaysNames[date.getDay()];
};

export const cyrillicToTranslitUrl = (str) => {
  const translitMap = new Map([
    ["а", "a"],
    ["б", "b"],
    ["в", "v"],
    ["г", "g"],
    ["д", "d"],
    ["е", "e"],
    ["є", "e"],
    ["ё", "e"],
    ["ж", "j"],
    ["з", "z"],
    ["и", "i"],
    ["ї", "yi"],
    ["й", "i"],
    ["к", "k"],
    ["л", "l"],
    ["м", "m"],
    ["н", "n"],
    ["о", "o"],
    ["п", "p"],
    ["р", "r"],
    ["с", "s"],
    ["т", "t"],
    ["у", "u"],
    ["ф", "f"],
    ["х", "h"],
    ["ц", "c"],
    ["ч", "ch"],
    ["ш", "sh"],
    ["щ", "shch"],
    ["ы", "y"],
    ["э", "e"],
    ["ю", "u"],
    ["я", "ya"],
  ]);

  let translitUrl = "";

  for (let i = 0; i < str.length; i++) {
    const letter = str[i].toLowerCase();

    translitUrl += translitMap.get(letter) || "";

    if (letter === " ") {
      translitUrl += " ";
    }
  }

  return translitUrl.trim().replace(/\s+/g, "-");
};
