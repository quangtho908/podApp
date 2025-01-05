import { create } from "zustand"
import { ModalInstance, ModalProps, State } from "./types"

type Action = {
  setProps: (modal: ModalInstance, props: ModalProps) => void
  setModal: (modal: ModalInstance) => void,
  setVisible: (modal: ModalInstance, visible: boolean) => void
}

const useModal = create<State & Action>(set => ({
  modals: new Map<ModalInstance, ModalProps>(),
  setProps: (modal: ModalInstance, props: ModalProps) => set((state) => {
    state.modals.set(modal, props)
    return {modals: state.modals}
  }),
  setModal: (modal: ModalInstance) => set((state) => {
    state.modals.set(modal, {visible: false})
    return {modals: state.modals}
  }),
  setVisible: (modal: ModalInstance, visible: boolean) => set(state =>{
    const props = state.modals.get(modal) || {}
    state.modals.set(modal, { ...props, visible})
    return {modals: state.modals}
  })
}))

export default useModal;