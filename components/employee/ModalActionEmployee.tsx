import { transparent, white } from "@/constants/Pallete";
import color from "@/styles/color";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect } from "react";
import { putRequest } from "@/apis/common";
import merchantService from "@/service/merchant/merchantStore";
import { useRouter } from "expo-router";
import useModal from "@/service/modal/modal";
import employeesService from "@/service/employee/employee";
import useSpinner from "@/service/spinner";
import Toast from "react-native-toast-message";

export default function ModalActionEmployee() {
  const {setModal, setProps, modals} = useModal()
  const {resetCurrentEmployee, currentEmployee} = employeesService()
  const {currentMerchant} = merchantService()
  const router = useRouter()
  const {setVisible} = useSpinner()
  useEffect(()=> {
    setModal("employee_action");
  }, [])

  const cancel = () => {
    resetCurrentEmployee()
    setProps("employee_action", {
      visible: false
    })
  }

  const onDelete = async () => {
    if(currentMerchant === null) return;
    setVisible(true)
    setProps("employee_action", {
      visible: false
    })
    const response = await putRequest(`merchants/users`, {
      merchantId: currentMerchant,
      userId: currentEmployee.id
    })
    if(response.status === 401){
      router.replace("/")
      setVisible(false)
      return
    }else if(response.status !== 200) {
      setVisible(false)
      Toast.show({
        text1: "Thao tác thất bại",
        text2: "Nhân viên không tồn tại trong cửa hàng",
        type: "error"
      })
      return
    }
    setVisible(false)
    resetCurrentEmployee()
  }

  return (
    <Modal
      visible={modals.get("employee_action")?.visible}
      animationType="fade"
      onRequestClose={cancel}
      transparent={true}
    >
      <TouchableOpacity 
        style={styles.container}
        onPressOut={cancel}
      >
        <View style={styles.view}>
          <TouchableOpacity style={styles.action} onPress={onDelete}>
            <Text style={{...color.textRed500}}>Xoá</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: transparent[50],
    paddingHorizontal: 20
  },
  view: {
    backgroundColor: white[50],
    bottom: 0,
    borderRadius: 5,
    shadowColor: white[800],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  action: {
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: white[50],
    padding: 20
  }
})