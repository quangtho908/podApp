import ChooseIamge from "@/components/ChooseImage";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import { View, StyleSheet } from "react-native";

export default function updateProduct() {
  return(
    <View style={styles.container}>
      <ChooseIamge />
      <Input label="Tên sản phẩm" placeholder="Tên sản phẩm" />
      <Input label="Giá" placeholder="Giá" />
      <PrimaryButton title="Tạo món" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10
  }
})