import { getRequest } from "@/apis/common";
import { BaseDTO, BaseModel } from "@/constants/BaseModel";
import * as _ from "lodash";
import { create } from "zustand";

export interface TableFilterParams extends BaseDTO {
  merchantId: number
}

export interface Table extends BaseModel {
  id: number,
  name: string,
  isUsed: boolean
}

type State = {
  tables: Table[],
  currentTable: Table
}

type Action = {
  filter: (params: TableFilterParams) => void,
  setCurrentTable: (table: Table) => void,
  resetCurrentTable: () => void
}
const initCurrentTable: Table = {
  id: 0,
  name: "",
  isUsed: false
}

const tablesService = create<State & Action>(set => ({
  tables: [],
  currentTable: {..._.cloneDeep(initCurrentTable)},
  filter: async (params: TableFilterParams) => {
    const tables = await getRequest<Table[], TableFilterParams>("tables", params)
    set({tables})
  },
  setCurrentTable: (table: Table) => set({currentTable: table}),
  resetCurrentTable: () => set({currentTable: _.cloneDeep(initCurrentTable)})
}))

export default tablesService;