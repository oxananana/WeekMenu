import { weekDaysNames } from "../constants";

export const getWeekDayName = (day) => {
  const date = new Date(day);
  return weekDaysNames[date.getDay()];
};
