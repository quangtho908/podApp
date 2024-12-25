import { create } from "zustand"

type ModalProps = {
  visible: boolean
}

type State = {
  modals: Map<string, ModalProps>
}

type Action = {
  setProps: (modal: string, props: ModalProps) => void
  setModal: (modal: string) => void
}

const useModalBank = create<State & Action>(set => ({
  modals: new Map<string, ModalProps>(),
  setProps: (modal: string, props: ModalProps) => set((state) => {
    state.modals.set(modal, props)
    return {modals: state.modals}
  }),
  setModal: (modal: string) => set((state) => {
    state.modals.set(modal, {visible: false})
    return {modals: state.modals}
  })
}))

export default useModalBank;