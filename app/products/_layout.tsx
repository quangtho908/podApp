import productService from "@/service/product/productsStore";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

export default function ProductsLayout() {
  const {resetCurrentProduct, currentProduct} = productService()
  const router = useRouter();
  const cancelUpdateProduct = () => {
    resetCurrentProduct()
    router.back()
  }

  return (
    <Stack screenOptions={{headerTitleAlign: "center"}}>
      <Stack.Screen name="addProduct" options={{headerTitle: "Thêm sản phẩm mới"}} />
      <Stack.Screen
        name="updateProduct"
        options={{
          headerTitle: currentProduct.name,
          headerLeft: () => (
            <TouchableOpacity onPress={cancelUpdateProduct}>
              <Text style={{...color.textBlue500, ...styleText.text}}>Huỷ</Text>
            </TouchableOpacity>
          )
        }}
      />
    </Stack>
  )
}