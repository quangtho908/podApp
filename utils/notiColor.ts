import { green, pictonBlue, white } from "@/constants/Pallete";

export type TypeNoti = "default" | "createOrder" | "paymentOrder"

export const notiColor: {[key in TypeNoti]: string} = {
  default: white[200],
  createOrder: pictonBlue[500],
  paymentOrder: green[500]
}