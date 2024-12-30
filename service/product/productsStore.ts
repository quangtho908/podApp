import { getRequest } from "@/apis/common"
import { BaseDTO, BaseModel } from "@/constants/BaseModel"
import { AxiosError, AxiosResponse } from "axios"
import * as _ from "lodash"
import { create } from "zustand"

export interface ProductFilterParams extends BaseDTO {
  merchantId: number
}

export interface Product extends BaseModel {
  id: number,
  name: string,
  price: number,
  image?: string
}

type State = {
  products: Product[],
  currentProduct: Product,
  unauth: boolean
}

type Action = {
  filter: (params: ProductFilterParams) => Promise<void>,
  setCurrentProduct: (product: Product) => void,
  resetCurrentProduct: () => void,
  setUnauth: (state: boolean) => void
}

const initCurrentProduct: Product = {
  id: 0,
  name: "",
  price: 0,
}

const productService = create<State & Action>(set => ({
  products: [],
  currentProduct: _.cloneDeep(initCurrentProduct),
  unauth: false,
  filter: async (params: ProductFilterParams) => {
    const response = await getRequest<ProductFilterParams>("products", params)
    if(response.status === 200) {
      return set({products: (response as AxiosResponse).data})
    }else if(response.status === 401) {
      return set({unauth: true})
    }
    return set({products: []})
  },
  setCurrentProduct: (product: Product) => set({currentProduct: product}),
  resetCurrentProduct: () => set({currentProduct: _.cloneDeep(initCurrentProduct)}),
  setUnauth: (unauth: boolean) => set({unauth})
}));

export default productService;