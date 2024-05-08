const moment = require("moment/moment");

export const fToNow = (date) => {
  return date ? moment(date).fromNow() : "";
};

export const fDateTime = (date, newFormat) => {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? moment(date).format(fm) : "";
};
