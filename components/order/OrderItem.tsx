import { green, orange, red, white } from "@/constants/Pallete";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TabBarIcon } from "../navigation/TabBarIcon";
import useModalOrderDetail from "@/service/modalOrderDetail";
import { useRouter } from "expo-router";
import orderService, { InProgressOrder } from "@/service/orders/orderStore";
import { convertPrice, getDate, getTime } from "@/utils/converData";
import { postRequest } from "@/apis/common";
import merchantService from "@/service/merchant/merchantStore";
import bankAccountService from "@/service/bankAccounts/bankAccountsStore";

export default function OrderItem ({order}: {order: InProgressOrder}) {
  const setVisible = useModalOrderDetail(state => state.setVisible);
  const router = useRouter();
  const {setCurrentOrder, filter} = orderService()
  const {currentMerchant} = merchantService()
  const payment = () => {
    setCurrentOrder(order)
    router.push("/payments");
  }

  const cancel = async () => {
    const response = await postRequest(`orders/changeStatus/${order.id}`, {
      merchantId: currentMerchant,
      status: "canceled"
    })

    if(response.status === 200){
      await filter({merchantId: currentMerchant})
      return
    }
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
            <Text style={{...styleText.textTitle}}>{order.table?.name || ""}</Text>
            <Text style={{...styleText.text, ...color.textBlue700}}>{convertPrice(order.totalPrice)}</Text>
          </View>
          <Text>Sản phẩm: {order.products.length}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
            <TabBarIcon name={"refresh-circle-outline"} color={orange[600]} />
            <Text style={{...color.textOrange600}} >{order.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.action} onPress={cancel}>
          <Text style={{...styleText.text, ...color.textRed700}}>Huỷ</Text>
          <TabBarIcon name='backspace' color={red[700]}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={payment}>
          <TabBarIcon name='card' color={green[700]}/>
          <Text style={{...styleText.text, ...color.textGreen700}}>Thanh Toán</Text>
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