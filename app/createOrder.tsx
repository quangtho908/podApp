import CardProductOrder from "@/components/product/CardProductOrder";
import ModalOrder from "@/components/order/ModalOrder";
import ResetOnPullToRefresh from "@/components/ResetOnPullRequest";
import { View, StyleSheet, Alert } from "react-native";
import { useCallback, useEffect, useState } from "react";
import productService from "@/service/product/productsStore";
import merchantService from "@/service/merchant/merchantStore";
import newOrderService from "@/service/orders/newOrder";
import { useNavigation } from "expo-router";

export default function CreateOrderScreen() {

  const {products, filter} = productService()
  const {merchant} = merchantService()
  const {order, update, destroy} = newOrderService()
  const [skipAlert, setSkipAlert] = useState(false)
  const navigation = useNavigation();

  useEffect(() => {
    if(order.products.length <= 0) {
      setSkipAlert(true);
    }
  }, [JSON.stringify(order)])

  useEffect(() => { 
    order.merchantId = merchant.id;
    update(order);
    filter({merchantId: merchant.id})
    const cancel = navigation.addListener("beforeRemove", (e) => {
      if(skipAlert) {
        destroy();
        cancel();
        setSkipAlert(false)
        navigation.goBack();
        return;
      };
      e.preventDefault()
      Alert.alert("Bạn muốn huỷ tạo đơn", "Bạn chắc chắn chứ",
        [
          {text: "Huỷ", style: "cancel"},
          {text: "Xác nhận", onPress: () => {
            destroy();
            cancel();
            navigation.goBack();
          }}
        ]
      ) 
    })
    return () => cancel();
  }, [navigation, skipAlert])

  return(
    <View style={{flex: 1}}>
      <ResetOnPullToRefresh contentContainerStyle={styles.container}>
        {products.map(product => <CardProductOrder amount={0} key={product.id} {...product} />)}
      </ResetOnPullToRefresh>
      <ModalOrder />
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    paddingBottom: 250,
  }
})