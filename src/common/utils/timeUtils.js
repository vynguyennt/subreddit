export default function calcRelativeTime(current, previous) {
  const rtf = new Intl.RelativeTimeFormat("en", { style: "long" });
  if (isNaN(current) || isNaN(previous)) return rtf.format(0, "second");

  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return rtf.format(-Math.floor(elapsed / 1000), "second");
  } else if (elapsed < msPerHour) {
    return rtf.format(-Math.floor(elapsed / msPerMinute), "minute");
  } else if (elapsed < msPerDay) {
    return rtf.format(-Math.floor(elapsed / msPerHour), "hour");
  } else if (elapsed < msPerMonth) {
    return rtf.format(-Math.floor(elapsed / msPerDay), "day");
  } else if (elapsed < msPerYear) {
    return rtf.format(-Math.floor(elapsed / msPerMonth), "month");
  } else {
    return rtf.format(-Math.floor(elapsed / msPerYear), "year");
  }
}
