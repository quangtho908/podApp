import DatePicker from '@/components/common/DatePicker';
import CreateOrderButton from '@/components/CreateOrderButton';
import ModalOrderDetail from '@/components/order/ModalOrderDetail';
import OrderItem from '@/components/order/OrderItem';
import ResetOnPullToRefresh from '@/components/ResetOnPullRequest';
import merchantService from '@/service/merchant/merchantStore';
import orderService from '@/service/orders/orderStore';
import productService from '@/service/product/productsStore';
import { convertToDatePattern } from '@/utils/convertData';
import { useRouter } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter()
  const {filter, orders, unauth: unauthOrder, setUnauth: setUnauthOrder} = orderService()
  const {filter: filterProducs, unauth: unauthProduct, setUnauth: setUnauthProduct} = productService()
  const {currentMerchant} = merchantService()
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    loadProducts()
    filterByDate()
  }, [JSON.stringify(currentMerchant)])

  useEffect(() => {
    filterByDate()
  }, [currentDate, JSON.stringify(orders)])
  
  const loadProducts = async () => {
    await filterProducs({merchantId: currentMerchant})
    if(unauthProduct) {
      setUnauthProduct(false)
      router.replace("/")
      return
    }
  }

  const filterByDate = async () => {
    const date = moment(currentDate).startOf('day').toDate()
    const toDate = moment(date).add(1, 'day').toDate()
    await filter({
      merchantId: currentMerchant,
      fromDate: convertToDatePattern(date),
      toDate: convertToDatePattern(toDate)
    })
    if(unauthOrder) {
      setUnauthOrder(false)
      router.replace("/")
      return
    }
  }

  const onChageDatePicker = (date: Date) => {
    setCurrentDate(date)
  }

  return (
    <View style={styles.container}>
      <DatePicker onChange={onChageDatePicker} />
      <ResetOnPullToRefresh reload={filterByDate} contentContainerStyle={{gap: 20, paddingBottom: 70}}>
        {orders.map(order => <OrderItem key={order.id} order={order}/> )}
      </ResetOnPullToRefresh>
      {(moment(currentDate).startOf("day").date() === moment(new Date()).startOf("day").date()) &&
        <CreateOrderButton onPress={() => router.push('/orders/createOrder')} />       
      }
      <ModalOrderDetail />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1
  }
});
