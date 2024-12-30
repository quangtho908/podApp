import { getRequest } from "@/apis/common";
import { BaseModel } from "@/constants/BaseModel";
import * as _ from "lodash";
import { create } from "zustand";
import { Bank } from "../banks/bankService";
import { AxiosResponse } from "axios";

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
  defaultAccount: BankAccount,
  unauth: boolean
}

type Action = {
  get: () => void,
  filter: (merchantId: number) => void,
  setCurrentBankAccount: (bankAccount: BankAccount) => void,
  resetCurrentBankAccount: () => void,
  setUnauth: (state: boolean) => void
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
  unauth: false,
  get: () => {},
  filter: async (merchantId: number) => {
    let response = await getRequest<{}>("bankAccounts", {
      merchantId
    })
    if(response.status === 200) {
      response = (response as AxiosResponse);
      return set({
        bankAccounts: response.data,
        defaultAccount: _.find(response.data, {primary: true}) || _.cloneDeep(initCurrentBankAccount)
      })
    }else if(response.status === 401) {
      return set({unauth: true})
    }
    return set({bankAccounts: []})
    
  },
  setCurrentBankAccount: (bankAccount: BankAccount) => set({currentBankAccount: bankAccount}),
  resetCurrentBankAccount: () => set({currentBankAccount: _.cloneDeep(initCurrentBankAccount)}),
  setUnauth: (unauth: boolean) => set({unauth})
}))

export default bankAccountService;