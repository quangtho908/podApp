import CardProductOrder from "@/components/product/CardProductOrder";
import ModalOrder from "@/components/order/ModalOrder";
import ResetOnPullToRefresh from "@/components/ResetOnPullRequest";
import { View, StyleSheet } from "react-native";
import { useEffect } from "react";
import productService from "@/service/product/productsStore";
import merchantService from "@/service/merchant/merchantStore";
import setOrderService from "@/service/orders/setOrder";

export default function CreateOrderScreen() {

  const {products, filter} = productService()
  const {merchant} = merchantService()
  const {order, update} = setOrderService()

  useEffect(() => { 
    order.merchantId = merchant.id;
    update(order);
    filter({merchantId: merchant.id})
  }, [])

  return(
    <View style={{flex: 1}}>
      <ResetOnPullToRefresh contentContainerStyle={styles.container}>
        {products.map(product => <CardProductOrder quantity={0} key={product.id} {...product} />)}
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