import { VerifyPath } from "@/constants/BaseModel"
import { create } from "zustand"

type State = {
  verify: keyof VerifyPath
}

type Action = {
  setVerify: (state: keyof VerifyPath) => void
}

const verifyService = create<State & Action>(set => ({
  verify: "activeAccount",
  setVerify: (state: keyof VerifyPath) => set({verify: state})
}))

export default verifyService;

export const verifyRouter: VerifyPath = {
  activeAccount: "/pin/setup", 
  setPassword: "/changePassword"
}