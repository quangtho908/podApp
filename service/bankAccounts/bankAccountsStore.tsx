import { getRequest } from "@/apis/common";
import { BaseModel } from "@/constants/BaseModel";
import * as _ from "lodash";
import { create } from "zustand";
import { Bank } from "../banks/bankService";

export interface BankAccount extends BaseModel {
  id: number,
  accountName: string,
  accountNumber: string,
  bank: Bank
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
  accountName: "",
  accountNumber: "",
  primary: false,
  bank: {
    id: 0,
    code: "",
    bin: "",
    name: "",
    shortName: "",
    logo: "",
    transferSupported: 0,
    lookupSupported: 0
  }
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