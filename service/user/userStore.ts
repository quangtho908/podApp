import { getRequest } from "@/apis/common";
import { BaseModel } from "@/constants/BaseModel";
import { AxiosResponse } from "axios";
import _ from "lodash";
import { _ScrollView } from "react-native";
import { create } from "zustand";

export interface User extends BaseModel {
  id: number
  phoneNumber: string
  email: string
  fullName: string
  avatar: string
}

type State = {
  user: User
  unauth: boolean
}

type Action = {
  get: () => void,
  setUnauth: (state: boolean) => void
}

const initUser: User = {
  id: 0,
  phoneNumber: "",
  email: "",
  fullName: "",
  avatar: ""
}

const userService = create<State & Action>((set) => ({
  user: _.cloneDeep(initUser),
  unauth: false,
  get: async () => {
    const response = await getRequest<{}>(`users`, {})
    if(response.status === 200) {
      return set({user: (response as AxiosResponse).data})
    }else if (response.status === 401) {
      return set({unauth: true})
    }
    return set({user: _.cloneDeep(initUser)})
  },
  setUnauth: (state: boolean) => set({unauth: state})
}))

export default userService;