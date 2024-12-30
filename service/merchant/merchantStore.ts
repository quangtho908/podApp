import { getRequest } from "@/apis/common";
import { BaseDTO, BaseModel } from "@/constants/BaseModel";
import { AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import * as _ from "lodash";
import { create } from "zustand";
import authService from "../auth/authStore";

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
  unauth: boolean
}

type Action = {
  get: () => void,
  filter: () => void,
  setCurrentMerchant: (merchantId: number) => void,
  setUnauth: (state: boolean) => void
}


const merchantService = create<State & Action>(set => ({
  currentMerchant: 0,
  merchants: [],
  unauth: false,
  get: () => {},
  filter: async () => {
    const response = await getRequest<{}>("merchants", {})
    if(response.status === 200) {
      return set({merchants: (response as AxiosResponse).data})
    }else if(response.status === 401) {
      return set({unauth: true})
    }
    return set({merchants: []})
  },
  setCurrentMerchant: (merchantId: number) => set({currentMerchant: merchantId}),
  setUnauth: (unauth: boolean) => set({unauth})
}))

export default merchantService;