import { create } from "zustand"

type ModalProps = {
  visible: boolean,
  product: any
}

export enum ModalProductType {
  Action
}

type State = {
  modals: Map<ModalProductType, ModalProps>
}

type Action = {
  setProps: (modal: ModalProductType, props: ModalProps) => void
  setModal: (modal: ModalProductType) => void
}

const useModalProduct = create<State & Action>(set => ({
  modals: new Map<ModalProductType, ModalProps>(),
  setProps: (modal: ModalProductType, props: ModalProps) => set((state) => {
    state.modals.set(modal, props)
    return {modals: state.modals}
  }),
  setModal: (modal: ModalProductType) => set((state) => {
    state.modals.set(modal, {visible: false, product: []})
    return {modals: state.modals}
  })
}))

export default useModalProduct;