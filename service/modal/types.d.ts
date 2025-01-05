export type ModalInstance =
  "employee_action" | "choose_table" | "order_detail" |
  "action_account_bank" | "choose_bank" | "action_product" |
  "create_table" | "action_table" | "edit_table" 
export type ModalProps = {
  visible: boolean
}
export type State = {
  modals: Map<ModalInstance, ModalProps>
}