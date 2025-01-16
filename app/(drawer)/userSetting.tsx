import { postRequest, putRequest } from "@/apis/common";
import ChooseIamge from "@/components/common/ChooseImage";
import Input from "@/components/common/Input";
import PrimaryButton from "@/components/common/PrimaryButton";
import ResetOnPullToRefresh from "@/components/common/ResetOnPullRequest";
import verifyService from "@/service/auth/verifyStore";
import useChooseImage from "@/service/chooseImage";
import useSpinner from "@/service/spinner";
import userService from "@/service/user/userStore";
import styleText from "@/styles/text";
import { useRouter } from "expo-router";
import _ from "lodash";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
export default function UserSetting() {
  const router = useRouter()
  const {user, get, unauth, setUnauth} = userService()
  const {setVisible: setSpinner} = useSpinner()
  const {file, setFile} = useChooseImage()
  const [fullName, setFullname] = useState("")
  const {setVerify} = verifyService()
  useEffect(() => {
    getUser()
  }, [])
  const getUser = async () => {
    await get();
    if(unauth) {
      setUnauth(false)
      router.replace("/")
      return
    }
    setFile(user.avatar)
  }

  const onSaveAvatar = async () => {
    setSpinner(true)
    const body = new FormData();
    if(!_.isEmpty(file)) {
      const fileName = file.split('/').pop();
      body.append("image", {name: fileName, uri: file, type: "image/*"} as any)
    }else {
      body.append("empty", "")
    }
    
    const response = await postRequest("users/avatar", body, {
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
    Toast.show({
      type: "success",
      text1: "Cập nhật ảnh thành công"
    })
  }

  const onSaveInfo = async () => {
    setSpinner(true)
    const response = await putRequest("users", {
      fullName
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
    Toast.show({
      type: "success",
      text1: "Cập nhật thông tin thành công"
    })
  }

  const changePassword = async () => {
    setSpinner(true)
    const response = await postRequest("users/reqVerify", {verifyAction: "setPassword"})
    if(response.status === 401) {
      setSpinner(false)
      router.replace("/")
      return
    }else if(response.status !== 200) {
      setSpinner(false)
      return
    }
    setVerify("setPassword")
    router.push("/signup/verifyMail")
    setSpinner(false)
  }

  return (
    <ResetOnPullToRefresh contentContainerStyle={styles.container} reload={getUser}>
      <View>
        <Text style={{...styleText.textTitle}}>Ảnh đại diện</Text>
        <ChooseIamge />
        <PrimaryButton title="Lưu ảnh" onPress={onSaveAvatar} />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={{...styleText.textTitle}}>Cập nhật thông tin</Text>
        <Input placeholder={user.fullName} label="Họ và tên" onChangeText={setFullname} />
        <PrimaryButton title="Lưu thông tin" onPress={onSaveInfo} />
      </View>
      <PrimaryButton title="Thay đổi mật khẩu" onPress={changePassword} />
    </ResetOnPullToRefresh>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20
  },
  infoContainer: {
    gap: 10
  }
})