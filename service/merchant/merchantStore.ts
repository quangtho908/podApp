import { getRequest } from "@/apis/common";
import { BaseDTO, BaseModel } from "@/constants/BaseModel";
import * as _ from "lodash";
import { create } from "zustand";

export interface Merchant extends BaseModel {
  id: number,
  name: string,
  address: string,
  phoneNumber: string,
  role: string
  createdAt: Date,
  updatedAt: Date
}

type State = {
  currentMerchant: number,
  merchants: Merchant[],
}

type Action = {
  get: () => void,
  filter: () => void,
  setCurrentMerchant: (merchantId: number) => void
}


const merchantService = create<State & Action>(set => ({
  currentMerchant: 0,
  merchants: [],
  get: () => {},
  filter: async () => {
    const response = await getRequest<Merchant[], {}>("merchants", {})
    set({merchants: response})
  },
  setCurrentMerchant: (merchantId: number) => set({currentMerchant: merchantId})
}))

export default merchantService;