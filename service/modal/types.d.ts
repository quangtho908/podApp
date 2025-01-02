export type ModalInstance = "employee_action"
export type ModalProps = {
  visible: boolean
}
export type State = {
  modals: Map<ModalInstance, ModalProps>
}