import { getRequest } from "@/apis/common";
import { BaseModel } from "@/constants/BaseModel";
import * as _ from "lodash";
import { create } from "zustand";

export interface BankAccount extends BaseModel {
  id: number,
  bankBin: string,
  accountName: string,
  accountNumber: string,
  primary: boolean
}

type State = {
  currentBankAccount: BankAccount,
  bankAccounts: BankAccount[],
  defaultAccount: BankAccount
}

type Action = {
  get: () => void,
  filter: (merchantId: number) => void,
  setCurrentBankAccount: (bankAccount: BankAccount) => void,
  resetCurrentBankAccount: () => void
}

const initCurrentBankAccount: BankAccount = {
  id: 0,
  bankBin: "",
  accountName: "",
  accountNumber: "",
  primary: false
}

const bankAccountService = create<State & Action>(set => ({
  currentBankAccount: _.cloneDeep(initCurrentBankAccount),
  bankAccounts: [],
  defaultAccount: _.cloneDeep(initCurrentBankAccount),
  get: () => {},
  filter: async (merchantId: number) => {
    const response = await getRequest<BankAccount[], {}>("bankAccounts", {
      merchantId
    })
    set({defaultAccount: _.find(response, {primary: true}) || _.cloneDeep(initCurrentBankAccount)})
    set({bankAccounts: response})
  },
  setCurrentBankAccount: (bankAccount: BankAccount) => set({currentBankAccount: bankAccount}),
  resetCurrentBankAccount: () => set({currentBankAccount: _.cloneDeep(initCurrentBankAccount)})
}))

export default bankAccountService;