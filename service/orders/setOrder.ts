import { create } from "zustand"
import * as _ from "lodash";
import { Table } from "../tables/tablesStore";
type ProductOrder = {
  productId: number,
  quantity?: number
}

type Order = {
  merchantId: number,
  tableId?: number,
  isTakeOut?: boolean,
  note: string,
  products: ProductOrder[]
}

type State = {
  order: Order,
  currentTable: Table | null,
  removeProducts: ProductOrder[]
}

type Action = {
  update: (order: Order) => void,
  updateCurrentTable: (table: Table | null) => void,
  isTakeOut: (state: boolean) =>  void,
  updateRemoveProducts: (products: ProductOrder[]) => void
  destroy: () => void
}

const initState: State = {
  order: {
    merchantId: 0,
    note: "",
    products: []
  },
  currentTable: null,
  removeProducts: []
}

const setOrderService = create<State & Action>(set => ({
  ..._.cloneDeep(initState),
  update: (order: Order) => set({order}),
  updateCurrentTable: (table: Table | null) => {
    if(table == null) {
      set(state => ({order: {...state.order, tableId: 0, isTakeOut: true}}))
      set({currentTable: null})
      return;
    }
    set(state => ({order: {...state.order, tableId: table.id, isTakeOut: false}}))
    set({currentTable: table})
  },
  isTakeOut: (isTakeOut: boolean) => set(state => ({order: {...state.order, isTakeOut}})),
  updateRemoveProducts: (products: ProductOrder[]) => set({removeProducts: products}),
  destroy: () => set(_.cloneDeep(initState))
}))

export default setOrderService;