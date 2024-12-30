import { BaseDTO, BaseModel } from "@/constants/BaseModel";
import { Product } from "../product/productsStore";
import { create } from "zustand";
import { getRequest } from "@/apis/common";
import * as _ from "lodash";
import { Table } from "../tables/tablesStore";
import { AxiosResponse } from "axios";

export type StatusOrder = "waiting" | "progress" | "done" | "canceled";

type ProductOrder = {
  id: number,
  name: string,
  price?: number,
  quantity: number
}
export interface FilterInProgressOrderParams extends BaseDTO {
  id?: number
  merchantId: number
  statuses?: StatusOrder[]
  fromDate?: string,
  toDate?: string
}

export interface InProgressOrder extends BaseModel {
  id: number
  note: string
  status: string
  totalPrice: number
  createdAt: Date
  products: ProductOrder[],
  table: Table
}

type State = {
  orders: InProgressOrder[]
  currentOrder: InProgressOrder,
  unauth: boolean
}

type Action = {
  filter: (params: FilterInProgressOrderParams) => void,
  setCurrentOrder: (order: InProgressOrder) => void,
  resetCurrentOrder: () => void,
  setUnauth: (state: boolean) => void
}

const initOrder: InProgressOrder = {
  id: 0,
  note: "",
  status: "string",
  totalPrice: 0,
  createdAt: new Date(),
  products: [],
  table: {
    id: 0,
    name: "",
    isUsed: false
  }
}

const orderService = create<State & Action>((set) => ({
  orders: [],
  currentOrder: _.cloneDeep(initOrder),
  unauth: false,
  filter: async (params: FilterInProgressOrderParams) => {
    const response = await getRequest<FilterInProgressOrderParams>("orders", params)
    if(response.status === 200) {
      return set({orders: (response as AxiosResponse).data})
    }else if(response.status === 401) {
      return set({unauth: true})
    }
    return set({orders: []})
  },
  setCurrentOrder: (order: InProgressOrder) => set({currentOrder: order}),
  resetCurrentOrder: () => set({currentOrder: _.cloneDeep(initOrder)}),
  setUnauth: (unauth: boolean) => set({unauth})
}))

export default orderService;