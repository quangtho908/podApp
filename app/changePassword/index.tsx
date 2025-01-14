import { postRequest } from "@/apis/common";
import Input from "@/components/common/Input";
import PasswordField from "@/components/common/PasswordField";
import PrimaryButton from "@/components/common/PrimaryButton";
import useSpinner from "@/service/spinner";
import { useRouter } from "expo-router";
import _ from "lodash";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

export default function ChangePassword() { 
  const [password, setPassword] = useState("");
  const [reTypePassword, setReTypePassword] = useState("");
  const {setVisible} = useSpinner()
  const router = useRouter()
  const submit = async () => {
    setVisible(true)
    if(password !== reTypePassword || _.isEmpty(password) || _.isEmpty(reTypePassword)) {
      Toast.show({
        type: "error",
        text1: "Mật khẩu không khớp"
      })
      setReTypePassword("")
      setVisible(false)
      return
    }
    const response = await postRequest("users/setPassword", {password})
    if(response.status === 401) {
      setVisible(false)
      router.replace("/")
      return
    }else if(response.status !== 200) {
      console.log(response)
      setVisible(false)
      return
    }
    setVisible(false)
    Toast.show({
      type: "success",
      text1: "Cập nhật ảnh thành công"
    })
    router.replace("/(drawer)/(tabs)/home")
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PasswordField onChangeText={setPassword} placeholder="Mật khẩu mới" />
      <PasswordField onChangeText={setReTypePassword} placeholder="Nhập lại mật khẩu" />
      <PrimaryButton title="Xác nhận" onPress={submit} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10
  }
})