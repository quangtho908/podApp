import { green, orange, red, white } from "@/constants/Pallete";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TabBarIcon } from "../navigation/TabBarIcon";
import useModalOrderDetail from "@/service/modalOrderDetail";
import { useRouter } from "expo-router";
import orderService, { InProgressOrder } from "@/service/orders/orderStore";
import moment from "moment";
import { convertPrice, getDate, getTime } from "@/utils/converData";

export default function OrderItem ({order}: {order: InProgressOrder}) {
  const setVisible = useModalOrderDetail(state => state.setVisible);
  const router = useRouter();
  const {setCurrentOrder, currentOrder} = orderService()
  const payment = () => {
    router.push("/payment");
  }

  const select = () => {
    setVisible(true)
    setCurrentOrder(order)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerContent} onPress={select}>
        <View style={{gap: 5}}>
          <Text>{getTime(order.createdAt)}</Text>
          <Text>{getDate(order.createdAt)}</Text>
        </View>
        <View style={styles.viewContent}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{...styleText.textTitle}}>Bàn 1</Text>
            <Text style={{...styleText.text, ...color.textBlue500}}>{convertPrice(order.totalPrice)}</Text>
          </View>
          <Text>Sản phẩm: {order.products.length}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
            <TabBarIcon name={"refresh-circle-outline"} color={orange[500]} />
            <Text style={{...color.textOrange500}} >{order.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.action}>
          <Text style={{...styleText.text, ...color.textRed500}}>Huỷ</Text>
          <TabBarIcon name='backspace' color={red[500]}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={payment}>
          <TabBarIcon name='card' color={green[500]}/>
          <Text style={{...styleText.text, ...color.textGreen500}}>Thanh Toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white[50],
    borderRadius: 5,
  },
  containerContent: {
    flexDirection: 'row',
    gap: 20,
    padding: 15,
  },
  viewContent: {
    gap: 5,
    flex: 1
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15
  }
})