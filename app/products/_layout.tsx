import productService from "@/service/product/productsStore";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

export default function ProductsLayout() {
  const {resetCurrentProduct} = productService()
  const router = useRouter();
  const cancelUpdateProduct = () => {
    resetCurrentProduct()
    router.back()
  }

  return (
    <Stack>
      <Stack.Screen name="addProduct" options={{headerTitle: "Cài đặt mã PIN"}} />
      <Stack.Screen
        name="updateProduct"
        options={{
          headerTitle: "Nhập mã PIN",
          headerTitleAlign: "center",
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