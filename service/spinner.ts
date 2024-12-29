import { create } from "zustand"

type State = {
  visible: boolean
}

type Action = {
  setVisible: (visible: boolean) => void
}

const useSpinner = create<State & Action>(set => ({
  visible: false,
  order: {},
  setVisible: (newState: boolean) => set(() => ({visible: newState})),
}))

export default useSpinner;