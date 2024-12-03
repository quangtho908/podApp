import { create } from "zustand"

type State = {
  visible: boolean,
  order: any
}

type Action = {
  setVisible: (visible: boolean) => void
  setOrder: (order: any) => void 
}

const useModalChooseTable = create<State & Action>(set => ({
  visible: false,
  order: {},
  setVisible: (newState: boolean) => set(() => ({visible: newState})),
  setOrder: (newOrder: any) => set(() => ({order: newOrder}))
}))

export default useModalChooseTable;