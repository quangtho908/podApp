import { create } from "zustand"

type ModalProps = {
  visible: boolean,
  table: any
}

export enum ModalType {
  Action,
  Edit,
  Create
}

type State = {
  modals: Map<ModalType, ModalProps>
}

type Action = {
  setProps: (modal: ModalType, props: ModalProps) => void
  setModal: (modal: ModalType) => void
}

const useModalTable = create<State & Action>(set => ({
  modals: new Map<ModalType, ModalProps>(),
  setProps: (modal: ModalType, props: ModalProps) => set((state) => {
    state.modals.set(modal, props)
    return {modals: state.modals}
  }),
  setModal: (modal: ModalType) => set((state) => {
    state.modals.set(modal, {visible: false, table: []})
    return {modals: state.modals}
  })
}))

export default useModalTable;