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

export const cyrillicToTranslitUrl = (str) => {
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
