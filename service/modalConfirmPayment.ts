import { create } from "zustand"

type State = {
  visible: boolean,
  payment: any
}

type Action = {
  setVisible: (visible: boolean) => void
  setPayment: (payment: any) => void 
}

const useModalConfirmPayment = create<State & Action>(set => ({
  visible: false,
  payment: {},
  setVisible: (newState: boolean) => set(() => ({visible: newState})),
  setPayment: (newPayment: any) => set(() => ({payment: newPayment}))
}))

export default useModalConfirmPayment;