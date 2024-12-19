import { getRequest } from "@/apis/common"
import { BaseDTO, BaseModel } from "@/constants/BaseModel"
import { create } from "zustand"

export interface ProductFilterParams extends BaseDTO {
  merchantId: number
}

export interface Product extends BaseModel {
  id: number,
  name: string,
  price: number
}

type State = {
  products: Product[]
}

type Action = {
  filter: (params: ProductFilterParams) => Promise<void>
}

const productService = create<State & Action>(set => ({
  products: [],
  filter: async (params: ProductFilterParams) => {
    const products = await getRequest<Product[], ProductFilterParams>("products", params)
    set({products})
  }
}));

export default productService;