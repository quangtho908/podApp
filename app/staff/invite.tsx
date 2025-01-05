import { postRequest } from "@/apis/common";
import Input from "@/components/common/Input";
import PrimaryButton from "@/components/common/PrimaryButton";
import merchantService from "@/service/merchant/merchantStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from 'react-native-toast-message';

export default function Invite() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const {currentMerchant} = merchantService();
  const router = useRouter()
  const onPress = async () => {
    const response = await postRequest("merchants/invite", {
      phoneNumber,
      merchantId: currentMerchant
    })
    if(response.status === 401) {
      router.replace("/")
      return
    }else if (response.status === 200) {
      router.back()
      Toast.show({
        text1: "Thêm nhân viên thành công",
        text2: "Nhân viên mới đã được bạn thêm vào",
        swipeable: true
      })
      return
    }
    Toast.show({
      type: "error",
      text1: "Thêm nhân viên thất bại",
      text2: "Nhân viên đã được thêm hoặc không tồn tại",
      swipeable: true
    })
  }

  return(
    <View style={styles.container}>
      <Input placeholder="Số điện thoại" keyboardType="number-pad" onChangeText={setPhoneNumber} />
      <PrimaryButton title="Thêm" onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10
  }
})