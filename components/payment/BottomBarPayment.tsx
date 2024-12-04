import { pictonBlue, white } from "@/constants/Pallete";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { TabBarIcon } from "../navigation/TabBarIcon";
import ResetOnPullToRefresh from "../ResetOnPullRequest";
import { useRouter } from "expo-router";
import useModalConfirmPayment from "@/service/modalConfirmPayment";

export default function BottomBarPayment () {
  const router = useRouter();
  const setModalConfirmPayment = useModalConfirmPayment(state => state.setVisible)

  const cash = () => {
    setModalConfirmPayment(true)
  }

  const bank = () => {
    setModalConfirmPayment(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{...styleText.text}}>Bàn số 1</Text>
        <Text style={{...styleText.text}}>
          Tổng cộng: <Text style={{...color.textBlue500}}>100.000</Text>
        </Text>
      </View>
      <Text style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        ...styleText.text
      }}>THÔNG TIN THANH TOÁN</Text>
      <TouchableOpacity style={styles.bankInfoContainer} onPress={() => router.push('/selectBank')}>
        <Image 
          style={styles.bankImage}
          source={{
            uri: 'https://api.vietqr.io/img/ACB.png'
          }} 
        />
        <Text>NGUYEN QUANG THO</Text>
      </TouchableOpacity>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.action} onPress={cash}>
          <TabBarIcon name="wallet" color={white[50]}/>
          <Text style={{...styleText.text, ...color.textWhite50}}>Tiền mặt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={bank}>
          <TabBarIcon name="card" color={white[50]} />
          <Text style={{...styleText.text, ...color.textWhite50}}>Chuyển khoản</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white[50],
    position: 'absolute',
    bottom: 0,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: white[200]
  },
  bankInfoContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    backgroundColor: white[100]
  },
  bankImage: {
    width: 100,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: pictonBlue[800],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  }
})