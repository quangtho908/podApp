import { white } from "@/constants/Pallete";
import orderPaymentService, { OrderPayment } from "@/service/orderPayments/orderPaymentStore";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { convertPrice, getDate, getTime } from "@/utils/convertData";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CardOrderPayment ({orderPayment}: {orderPayment: OrderPayment}) {
  const {setCurrentOrderPayment} = orderPaymentService()
  const router = useRouter()
  const onPress = () => {
    setCurrentOrderPayment(orderPayment)
    router.push("/orderPayments/orderPaymentDetail")
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={{...styleText.text}}>Đơn hàng số: {orderPayment.order.id}</Text>
      <Text style={{...styleText.sText}}>
        Thanh toán: <Text style={{...color.textBlue700}}>
          {getTime(orderPayment.createdAt)} ngày {getDate(orderPayment.createdAt)}
        </Text>
      </Text>
      <Text style={{...styleText.text}}>
        Tổng số tiền: <Text style={{...styleText.textTitle}}>{convertPrice(orderPayment.price)}</Text>
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white[50],
    padding: 10,
    borderRadius: 5,
    gap: 5
  }
})