import { getRequest, postRequest, putRequest } from "@/apis/common";
import ChooseIamge from "@/components/common/ChooseImage";
import Input from "@/components/common/Input";
import PrimaryButton from "@/components/common/PrimaryButton";
import ResetOnPullToRefresh from "@/components/common/ResetOnPullRequest";
import { white } from "@/constants/Pallete";
import useChooseImage from "@/service/chooseImage";
import merchantService, { Merchant } from "@/service/merchant/merchantStore";
import useSpinner from "@/service/spinner";
import styleText from "@/styles/text";
import { AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import _ from "lodash";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import Toast from "react-native-toast-message";

export default function MerchantSetting() {
  const {currentMerchant} = merchantService()
  const [data, setData] = useState({} as Merchant)
  const {setVisible} = useSpinner()
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const {setFile, file} = useChooseImage()
  const router = useRouter()
  useEffect(() => {
    reload()
  },[JSON.stringify(currentMerchant)])

  const reload = async () => {
    const response = await getRequest(`merchants?id=${currentMerchant}`, {})
    if(response.status === 401) {
      router.replace("/")
      return
    }else if(response.status !== 200) {
      return
    }
    setData((response as AxiosResponse).data)
    setFile((response as AxiosResponse).data.avatar || "")
  }

  const saveAvatar = async () => {
    setVisible(true)
    const body = new FormData();
    if(!_.isEmpty(file)) {
      const fileName = file.split('/').pop();
      body.append("image", {name: fileName, uri: file, type: "image/*"} as any)
    }else {
      body.append("emtpy", "")
    }
    
    const response = await putRequest(`merchants/avatar/${currentMerchant}`, body, {
      "Content-Type": "multipart/form-data"
    })
    console.log(response.request)
    if(response.status === 401) {
      setVisible(false)
      router.replace("/")
      return
    }else if(response.status !== 200) {
      setVisible(false)
      return
    }
    setVisible(false)
    Toast.show({
      type: "success",
      text1: "Cập nhật ảnh thành công"
    })
  }

  const updateInfo = async () => {
    setVisible(true)
    const response = await putRequest(`merchants/${currentMerchant}`, {
      name: name || data.name,
      address: address || data.address 
    })
    if(response.status === 401) {
      setVisible(false)
      router.replace("/")
      return
    }else if(response.status !== 200) {
      setVisible(false)
      return
    }
    setVisible(false)
    Toast.show({
      type: "success",
      text1: "Cập nhật ảnh thành công"
    })
  }

  return (
    <ResetOnPullToRefresh reload={reload} contentContainerStyle={styles.container}>
      <View>
        <ChooseIamge />
        <PrimaryButton title="Lưu ảnh" onPress={saveAvatar} />
      </View>
      <View style={styles.content}>
        <Text style={{...styleText.textTitle}}>Cập nhật thông tin</Text>
        <Input placeholder={data.name} onChangeText={setName} />
        <Input placeholder={data.address} onChangeText={setAddress}/>
        <PrimaryButton title="Lưu thông tin" onPress={updateInfo} />
      </View>
    </ResetOnPullToRefresh>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white[50],
    padding: 20,
    gap: 20
  },
  content: {
    gap: 10
  }
})