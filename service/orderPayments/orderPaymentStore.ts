import { BaseDTO, BaseModel } from "@/constants/BaseModel";
import { create } from "zustand";
import { getRequest } from "@/apis/common";
import * as _ from "lodash";
import { AxiosResponse } from "axios";
import { InProgressOrder } from "../orders/orderStore";

export interface FilterOrderPaymentParams extends BaseDTO {
  id?: number
  merchantId: number
  paymentMethod: string
  fromDate?: string
  toDate?: string
  page: number,
}

export interface OrderPayment extends BaseModel {
  order: InProgressOrder,
  image: string,
  createdAt: Date,
  price: number
}

type State = {
  orderPayments: OrderPayment[]
  currentOrderPayment: OrderPayment,
  unauth: boolean
}

type Action = {
  filter: (params: FilterOrderPaymentParams) => void,
  setCurrentOrderPayment: (order: OrderPayment) => void,
  resetCurrentOrderPayment: () => void,
  setUnauth: (state: boolean) => void
}

const initOrderPayment: OrderPayment = {
  order: {
    id: 0,
    note: "",
    totalPrice: 0,
    createdAt: new Date(),
    products: [],
    status: "",
    table: {
      id: 0,
      name: "",
      isUsed: false
    },
  },
  image: "",
  createdAt: new Date(),
  price: 0
}

const orderPaymentService = create<State & Action>((set) => ({
  orderPayments: [],
  currentOrderPayment: _.cloneDeep(initOrderPayment),
  unauth: false,
  filter: async (params: FilterOrderPaymentParams) => {
    const response = await getRequest<FilterOrderPaymentParams>("orderPayments", params)
    if(response.status === 200) {
      return set({orderPayments: (response as AxiosResponse).data})
    }else if(response.status === 401) {
      return set({unauth: true})
    }
    return set({orderPayments: []})
  },
  setCurrentOrderPayment: (order: OrderPayment) => set({currentOrderPayment: order}),
  resetCurrentOrderPayment: () => set({currentOrderPayment: _.cloneDeep(initOrderPayment)}),
  setUnauth: (unauth: boolean) => set({unauth})
}))

export default orderPaymentService;