import { BaseModel } from "@/constants/BaseModel";
import { create } from "zustand";

export interface Merchant extends BaseModel {
  id: number
}

type State = {
  merchant: Merchant,
  merchants: Merchant[],
}

type Action = {
  get: () => void
}

const merchantService = create<State & Action>(set => ({
  merchant: {
    id: 12
  },
  merchants: [],
  get: () => {}
}))

export default merchantService;