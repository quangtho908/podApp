import { create } from "zustand"

type State = {
  role: string
}

type Action = {
  setRole: (state: string) => void
}

const authService = create<State & Action>(set => ({
  role: "",
  setRole: (state: string) => set({role: state})
}))

export default authService;