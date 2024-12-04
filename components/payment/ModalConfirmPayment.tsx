import { white } from "@/constants/Pallete";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { TabBarIcon } from "../navigation/TabBarIcon";
import useModalConfirmPayment from "@/service/modalConfirmPayment";

export default function ModalConfirmPayment() {
  const visible = useModalConfirmPayment(state => state.visible);
  const setVisible = useModalConfirmPayment(state => state.setVisible)
  const confirm = () => {
    setVisible(false);
  }

  const cancel = () => {
    setVisible(false);
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.view}>
          {/* <View style={{alignItems: 'center'}}>
            <Text style={{...styleText.textTitle}}>Thanh toán tiền mặt</Text>
            <Text style={{...styleText.text}}>
              Tổng:
              <Text style={{...color.textBlue500}}> 2.000.000</Text>
            </Text>
          </View> */}
          <View style={{alignItems: 'center', gap: 10}}>
            <Text style={{...styleText.textTitle}}>Chuyển khoản</Text>
            <Image 
              style={styles.qr}
              source={{
              uri: 'https://img.vietqr.io/image/970415-113366668888-compact.png'
            }} />
            <Text>0374060165</Text>
            <Text style={{...styleText.text}}>NGUYEN QUANG THO</Text>
            <Text style={{...color.textBlue500, ...styleText.text}}> 2.000.000</Text>
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.action} onPress={cancel}>
              <TabBarIcon name='backspace' />
              <Text>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={confirm}>
              <TabBarIcon name='checkmark-circle' />
              <Text>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  view: {
    padding: 20,
    backgroundColor: white[50],
    gap: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    alignItems: 'center',
    gap: 10
  },
  qr: {
    width: 300,
    height: 300,
    resizeMode: 'stretch'
  }
})