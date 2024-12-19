import { getRequest } from "@/apis/common";
import { BaseDTO, BaseModel } from "@/constants/BaseModel";
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
  tables: Table[]
}

type Action = {
  filter: (params: TableFilterParams) => void
}

const tablesService = create<State & Action>(set => ({
  tables: [],
  filter: async (params: TableFilterParams) => {
    const tables = await getRequest<Table[], TableFilterParams>("tables", params)
    set({tables})
  } 
}))

export default tablesService;