import { create } from "zustand"
import * as _ from "lodash";
import { Table } from "../tables/tablesStore";

type SetTable = {
  merchantId: number,
  name: string
}

type State = {
  table: SetTable
}

type Action = {
  update: (order: SetTable) => void,
  destroy: () => void
}

const initState: State = {
  table: {
    merchantId: 0,
    name: ""
  }
}

const setTableService = create<State & Action>(set => ({
  ..._.cloneDeep(initState),
  update: (table: SetTable) => set({table}),
  destroy: () => set(_.cloneDeep(initState))
}))

export default setTableService;