export function formatDate(time) {
  const date = new Date(time);
  const hours = date.getHours();
  const minute = date.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  const hour = hours > 12 ? hours - 12 : hours;

  const formatedTime = `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  } ${amPm}`;

  return formatedTime;
}
