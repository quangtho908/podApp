import { BaseDTO } from "@/constants/BaseModel";
import { create } from "zustand";
import * as _ from "lodash";
export interface SignupDTO extends BaseDTO {
  fullName: string
  email: string
  phoneNumber: string
  password: string
}

type State = {
  signup: SignupDTO
}

type Action = {
  setSignup: (signup: SignupDTO) => void
  resetSignup: () => void
}

const intitialSignup: SignupDTO = {
  fullName: "",
  email: "",
  phoneNumber: "",
  password: ""
}

const signupService = create<State & Action>(set => ({
  signup: _.cloneDeep(intitialSignup),
  setSignup: (signup: SignupDTO) => set({signup}),
  resetSignup: () => set({signup: _.cloneDeep(intitialSignup)})
}))

export default signupService;