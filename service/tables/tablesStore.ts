import { getRequest } from "@/apis/common";
import { BaseDTO, BaseModel } from "@/constants/BaseModel";
import { AxiosResponse } from "axios";
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
  currentTable: Table,
  unauth: boolean
}

type Action = {
  filter: (params: TableFilterParams) => void,
  setCurrentTable: (table: Table) => void,
  resetCurrentTable: () => void,
  setUnauth: (state: boolean) => void
}
const initCurrentTable: Table = {
  id: 0,
  name: "",
  isUsed: false
}

const tablesService = create<State & Action>(set => ({
  tables: [],
  currentTable: {..._.cloneDeep(initCurrentTable)},
  unauth: false,
  filter: async (params: TableFilterParams) => {
    const response = await getRequest<TableFilterParams>("tables", params)
    if(response.status === 200) {
      return set({tables: (response as AxiosResponse).data})
    }else if (response.status === 401) {
      return set({unauth: true})
    }
    return set({tables: []})
  },
  setCurrentTable: (table: Table) => set({currentTable: table}),
  resetCurrentTable: () => set({currentTable: _.cloneDeep(initCurrentTable)}),
  setUnauth: (unauth: boolean) => set({unauth})
}))

export default tablesService;