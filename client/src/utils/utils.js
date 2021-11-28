import { DateTime } from "luxon";

export function duration(dateString1, dateString2) {
  const date1 = DateTime.fromISO(dateString1);
  const date2 = DateTime.fromISO(dateString2);
  const { hours, minutes, seconds } = date1.diff(date2, [
    "hours",
    "minutes",
    "seconds",
  ]);
  return {
    hours: hours < 10 ? `0${hours}` : hours,
    minutes: minutes < 10 ? `0${minutes}` : minutes,
    seconds: seconds < 10 ? `0${seconds}` : seconds,
  };
}
