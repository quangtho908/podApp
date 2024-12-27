import { create } from "zustand"

type State = {
  logout: boolean
}

type Action = {
  setLogout: (state: boolean) => void
}

const authService = create<State & Action>(set => ({
  logout: false,
  setLogout: (state: boolean) => set({logout: state})
}))

export default authService;