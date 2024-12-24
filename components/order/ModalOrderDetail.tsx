import { white } from "@/constants/Pallete";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import ResetOnPullToRefresh from "../ResetOnPullRequest";
import useModalOrderDetail from "@/service/modalOrderDetail";
import CardProductOrder from "../product/CardProductOrder";
import orderService from "@/service/orders/orderStore";
import { useEffect, useState } from "react";
import setOrderService from "@/service/orders/setOrder";
import merchantService from "@/service/merchant/merchantStore";
import { putRequest } from "@/apis/common";
import { ResponseError } from "@/apis/model";
import productService from "@/service/product/productsStore";
import * as _ from "lodash";

export default function ModalOrderDetail() {
  const visible = useModalOrderDetail(state => state.visible)
  const setVisible = useModalOrderDetail(state => state.setVisible)
  const {currentOrder, resetCurrentOrder} = orderService()
  const {order, update, destroy, removeProducts} = setOrderService()
  const {currentMerchant} = merchantService()
  const [isError, setIsError] = useState(false)
  const {products} = productService()
  const [error, setError] = useState({
      title: "",
      message: "",
    })
  useEffect(() => {
    if(currentMerchant == null) return;
    order.merchantId = currentMerchant
    order.note = currentOrder.note
    order.products = currentOrder.products.map(product => ({productId: product.id, quantity: product.quantity}))
    update(order)
  }, [JSON.stringify(currentOrder)])

  const cancel = () => {
    setVisible(false)
    destroy()
    resetCurrentOrder()
  }

  const confirm = async () => {
    setVisible(false)
    const [responseCreate, responseUpdate] = await Promise.all([
      putRequest(`orders/${currentOrder.id}`, order),
      putRequest(`orders/removeProduct/${currentOrder.id}`, {products: removeProducts})
    ]) 
    if(responseCreate.status === 200 || responseUpdate.status === 200) {
      destroy();
      resetCurrentOrder()
      return;
    }
    setIsError(true);
    setError({
      title: "Lỗi tạo đơn hàng",
      message: (responseCreate as ResponseError).response?.data.message || ""
    })
  }

  const getProductNotOrder = () => {
    return currentOrder.products.length === products.length ? [] : products.map(product =>  {
      if(_.some(currentOrder.products, {id: product.id})) {
        return;
      }
      return <CardProductOrder state={false} quantity={0} {...product} key={product.id}/>
    })
  }

  useEffect(() => {
      if(isError) {
        Alert.alert(error.title, error.message, [
          {text: "Ok", style: "cancel", onPress: () => {
            setIsError(false)
          }},
        ])
      }
    }, [isError, JSON.stringify(error)])

  return (
    <Modal
      animationType="slide"
      visible={visible}
    >
      <View style={{...styles.title}}>
        <TouchableOpacity onPress={cancel}>
          <Text style={{...styleText.text, ...color.textRed500}}>Huỷ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={confirm}>
          <Text style={{...styleText.text, ...color.textBlue500}}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
      <View style={{margin: 'auto', paddingVertical: 15}}>
        <Text style={{...styleText.textTitle}} >Đơn hàng</Text>
      </View>
      <ResetOnPullToRefresh contentContainerStyle={styles.container}>
        {currentOrder.products.map(product => <CardProductOrder isEdit={true} state={true} {...product} key={product.id} />)}
        {getProductNotOrder()}
      </ResetOnPullToRefresh>
    </Modal>
  )
}

const styles = StyleSheet.create({
  title: {
    borderBottomWidth: 2,
    borderBottomColor: white[200],
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    padding: 20
  }
})