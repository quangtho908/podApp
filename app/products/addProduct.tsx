import { postRequest } from "@/apis/common";
import ChooseIamge from "@/components/ChooseImage";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import merchantService from "@/service/merchant/merchantStore";
import { useRouter } from "expo-router";
import * as _ from "lodash";
import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";

export default function addProduct() {
  const [file, setFile] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const {currentMerchant} = merchantService()
  const router = useRouter();
  const confirm = async () => {
    const body = new FormData();
    if(!_.isEmpty(file)) {
      const fileName = file.split('/').pop();
      body.append("image", {name: fileName, uri: file, type: "image/*"} as any)
    }
    body.append("name", name);
    body.append("price", price)
    body.append("merchantId", currentMerchant.toString())
    const response = await postRequest("products", body, {
      "Content-Type": "multipart/form-data"
    })
    if(response.status !== 200) {
      return
    }
    router.back()
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ChooseIamge onChange={setFile} />
      <Input label="Tên sản phẩm" placeholder="Tên sản phẩm" onChangeText={setName} />
      <Input label="Giá" placeholder="Giá" onChangeText={setPrice} />
      <PrimaryButton title="Tạo món" onPress={confirm} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10
  }
})