import DatePicker from '@/components/common/DatePicker';
import CreateOrderButton from '@/components/CreateOrderButton';
import ModalOrderDetail from '@/components/order/ModalOrderDetail';
import OrderItem from '@/components/order/OrderItem';
import ResetOnPullToRefresh from '@/components/ResetOnPullRequest';
import merchantService from '@/service/merchant/merchantStore';
import orderService from '@/service/orders/orderStore';
import productService from '@/service/product/productsStore';
import { convertToDatePattern } from '@/utils/converData';
import { useRouter } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter()
  const {filter, orders} = orderService()
  const {filter: filterProducs} = productService()
  const {currentMerchant} = merchantService()
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    reload()
  }, [])
  useEffect(() => {
    filterByDate()
  }, [currentDate])

  const reload = () => {
    if(currentMerchant !== null) {
      filter({merchantId: currentMerchant})
      filterProducs({merchantId: currentMerchant})
    }
  }
  
  const filterByDate = () => {
    const date = moment(currentDate).startOf('day').toDate()
    const toDate = moment(date).add(1, 'day').toDate()
    if(currentMerchant !== null) {
      filter({
        merchantId: currentMerchant,
        fromDate: convertToDatePattern(date),
        toDate: convertToDatePattern(toDate)
      })
    }
  }

  const onChageDatePicker = (date: Date) => {
    setCurrentDate(date)
  }

  return (
    <View style={styles.container}>
      <DatePicker onChange={onChageDatePicker} />
      <ResetOnPullToRefresh reload={reload} contentContainerStyle={{gap: 20, paddingBottom: 70}}>
        {orders.map(order => <OrderItem key={order.id} order={order}/> )}
      </ResetOnPullToRefresh>
      <CreateOrderButton onPress={() => router.push('/orders/createOrder')} />
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
