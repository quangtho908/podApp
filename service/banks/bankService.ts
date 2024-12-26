import { getRequest } from "@/apis/common";
import { BaseModel } from "@/constants/BaseModel";
import axios from "axios";
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
  currentBank: Bank | null
}

type Action = {
  get: () => void,
  filter: (name: string) => void,
  setCurrentBank: (bank: Bank) => void,
  resetCurrentBank: () => void
}

let initBanks: Bank[] = [];

const bankService = create<State & Action>(set => ({
  banks: [],
  currentBank: null,
  get: async () => {
    const response = await getRequest<Bank[], {}>("banks", {})
    if(_.isEmpty(initBanks)) {
      initBanks = response;
    }
    return set({banks: response})
  },
  filter: (name: string) => {
    const results = _.filter(_.cloneDeep(initBanks), (bank: Bank) => 
      bank.name.toLowerCase().indexOf(name.toLowerCase()) > -1 || bank.shortName.toLowerCase().indexOf(name.toLowerCase()) > -1
    )
    return set({banks: results})
  },
  setCurrentBank: (bank: Bank) => set({currentBank: bank}),
  resetCurrentBank: () => set({currentBank: null})
}))

export default bankService;