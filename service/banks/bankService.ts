import { getRequest } from "@/apis/common";
import { BaseModel } from "@/constants/BaseModel";
import axios, { Axios, AxiosResponse } from "axios";
import * as _ from "lodash";
import { create } from "zustand";

export interface Bank extends BaseModel{
  id: number
  name: string
  code: string
  bin: string
  shortName: string
  logo: string
  transferSupported: number
  lookupSupported: number
}

type State = {
  banks: Bank[],
  currentBank: Bank | null,
  unauth: boolean
}

type Action = {
  get: () => void,
  filter: (name: string) => void,
  setCurrentBank: (bank: Bank) => void,
  resetCurrentBank: () => void,
  setUnauth: (state: boolean) => void
}

let initBanks: Bank[] = [];

const bankService = create<State & Action>(set => ({
  banks: [],
  currentBank: null,
  unauth: false,
  get: async () => {
    const response = await getRequest<{}>("banks/u", {})
    if(response.status === 200) {
      if(_.isEmpty(initBanks)) {
        initBanks = (response as AxiosResponse).data;
      }
      return set({banks: (response as AxiosResponse).data})
    }else if(response.status === 401) {
      return set({unauth: true})
    }
    return set({banks: []})
  },
  filter: (name: string) => {
    const results = _.filter(_.cloneDeep(initBanks), (bank: Bank) => 
      bank.name.toLowerCase().indexOf(name.toLowerCase()) > -1 || bank.shortName.toLowerCase().indexOf(name.toLowerCase()) > -1
    )
    return set({banks: results})
  },
  setCurrentBank: (bank: Bank) => set({currentBank: bank}),
  resetCurrentBank: () => set({currentBank: null}),
  setUnauth: (unauth: boolean) => set({unauth})
}))

export default bankService;