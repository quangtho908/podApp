import { putRequest } from "@/apis/common";
import ChooseIamge from "@/components/common/ChooseImage";
import Spinner from "@/components/common/Spinner";
import Input from "@/components/common/Input";
import PrimaryButton from "@/components/common/PrimaryButton";
import merchantService from "@/service/merchant/merchantStore";
import productService from "@/service/product/productsStore";
import useSpinner from "@/service/spinner";
import { useRouter } from "expo-router";
import _ from "lodash";
import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";

export default function updateProduct() {
  const {currentProduct} = productService()
  const {currentMerchant} = merchantService()
  const [file, setFile] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const {setVisible: setSpinner} = useSpinner()
  const router = useRouter();
  const confirm = async () => {
    setSpinner(true);
    const body = new FormData();
    if(!_.isEmpty(file)) {
      const fileName = file.split('/').pop();
      body.append("image", {name: fileName, uri: file, type: "image/*"} as any)
    }
    body.append("name", name || currentProduct.name);
    body.append("price", price || currentProduct.price.toString())
    body.append("merchantId", currentMerchant.toString())
    
    const response = await putRequest(`products/${currentProduct.id}`, body, {
      "Content-Type": "multipart/form-data"
    })
    if(response.status === 401) {
      setSpinner(false)
      router.replace("/")
      return
    }else if(response.status !== 200) {
      setSpinner(false)
      return
    }
    setSpinner(false)
    router.back()
  }

  return(
    <ScrollView contentContainerStyle={styles.container}>
      <ChooseIamge initFile={currentProduct.image} onChange={setFile} />
      <Input label="Tên sản phẩm" placeholder={currentProduct.name} onChangeText={setName} />
      <Input label="Giá" placeholder={currentProduct.price.toString()} onChangeText={setPrice} />
      <PrimaryButton title="Cập nhật" onPress={confirm} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10
  }
})