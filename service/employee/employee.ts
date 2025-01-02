import { getRequest } from "@/apis/common";
import { BaseDTO, BaseModel } from "@/constants/BaseModel";
import { AxiosResponse } from "axios";
import * as _ from "lodash";
import { create } from "zustand";

export interface EmployeeFilterParams extends BaseDTO {
  merchantId: number
}

export interface Employee extends BaseModel {
  id: number,
  phoneNumber: string,
  email: string,
  role: string
}

type State = {
  employees: Employee[],
  currentEmployee: Employee,
  unauth: boolean
}

type Action = {
  filter: (params: EmployeeFilterParams) => void,
  setCurrentEmployee: (employee: Employee) => void,
  resetCurrentEmployee: () => void,
  setUnauth: (state: boolean) => void
}
const initCurrentEmployee: Employee = {
  id: 0,
  phoneNumber: "",
  email: "",
  role: ""
}

const employeesService = create<State & Action>(set => ({
  employees: [],
  currentEmployee: {..._.cloneDeep(initCurrentEmployee)},
  unauth: false,
  filter: async (params: EmployeeFilterParams) => {
    const response = await getRequest<{}>(`merchants/users/${params.merchantId}`, {})
    if(response.status === 200) {
      return set({employees: (response as AxiosResponse).data})
    }else if (response.status === 401) {
      return set({unauth: true})
    }
    return set({employees: []})
  },
  setCurrentEmployee: (table: Employee) => set({currentEmployee: table}),
  resetCurrentEmployee: () => set({currentEmployee: _.cloneDeep(initCurrentEmployee)}),
  setUnauth: (unauth: boolean) => set({unauth})
}))

export default employeesService;