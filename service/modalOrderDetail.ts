import { create } from "zustand"

type State = {
  visible: boolean,
  tables: any[]
}

type Action = {
  setVisible: (visible: boolean) => void
  setTables: (order: any) => void 
}

const useModalOrderDetail = create<State & Action>(set => ({
  visible: false,
  tables: [],
  setVisible: (newState: boolean) => set(() => ({visible: newState})),
  setTables: (newList: any) => set(() => ({tables: newList}))
}))

export default useModalOrderDetail;