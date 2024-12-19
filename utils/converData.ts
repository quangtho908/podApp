import moment from "moment";

export function convertFromPattern(date: Date) {
  return moment(date, ["MM/DD/YYYY, hh:mm:ss A"])
}

export function getTime(date: Date) {
  return convertFromPattern(date).format("HH:mm")
}

export function getDate(date: Date) {
  return convertFromPattern(date).format("DD/MM/YYYY")
}

export function convertPrice(num: number) {
  if (typeof num !== "number") {
    num = Number(num);
    if (isNaN(num)) return "Invalid number";
  }
  return num.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
}