import { getRequest } from "@/apis/common"
import { BaseDTO, BaseModel } from "@/constants/BaseModel"
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
  currentProduct: Product
}

type Action = {
  filter: (params: ProductFilterParams) => Promise<void>,
  setCurrentProduct: (product: Product) => void,
  resetCurrentProduct: () => void
}

const initCurrentProduct: Product = {
  id: 0,
  name: "",
  price: 0,
}

const productService = create<State & Action>(set => ({
  products: [],
  currentProduct: _.cloneDeep(initCurrentProduct),
  filter: async (params: ProductFilterParams) => {
    const products = await getRequest<Product[], ProductFilterParams>("products", params)
    set({products})
  },
  setCurrentProduct: (product: Product) => set({currentProduct: product}),
  resetCurrentProduct: () => set({currentProduct: _.cloneDeep(initCurrentProduct)})
}));

export default productService;