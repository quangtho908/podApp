import { create } from "zustand"

type ModalProps = {
  visible: boolean,
  table: any
}

export enum ModalTableType {
  Action,
  Edit,
  Create
}

type State = {
  modals: Map<ModalTableType, ModalProps>
}

type Action = {
  setProps: (modal: ModalTableType, props: ModalProps) => void
  setModal: (modal: ModalTableType) => void
}

const useModalTable = create<State & Action>(set => ({
  modals: new Map<ModalTableType, ModalProps>(),
  setProps: (modal: ModalTableType, props: ModalProps) => set((state) => {
    state.modals.set(modal, props)
    return {modals: state.modals}
  }),
  setModal: (modal: ModalTableType) => set((state) => {
    state.modals.set(modal, {visible: false, table: []})
    return {modals: state.modals}
  })
}))

export default useModalTable;