import DatePicker from '@/components/common/DatePicker';
import CreateOrderButton from '@/components/order/CreateOrderButton';
import ModalOrderDetail from '@/components/order/ModalOrderDetail';
import OrderItem from '@/components/order/OrderItem';
import ResetOnPullToRefresh from '@/components/common/ResetOnPullRequest';
import merchantService from '@/service/merchant/merchantStore';
import orderService from '@/service/orders/orderStore';
import productService from '@/service/product/productsStore';
import { convertToDatePattern } from '@/utils/convertData';
import { registerForPushNotificationsAsync } from '@/utils/registerNotifications';
import { addNotificationReceivedListener, getDevicePushTokenAsync, getExpoPushTokenAsync } from 'expo-notifications';
import { useRouter } from 'expo-router';
import _, { times } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import notiService from '@/service/notifications/notificationStore';
import { notiColor } from '@/utils/notiColor';

export default function HomeScreen() {
  const router = useRouter()
  const {filter, orders, unauth: unauthOrder, setUnauth: setUnauthOrder} = orderService()
  const {filter: filterProducs, unauth: unauthProduct, setUnauth: setUnauthProduct} = productService()
  const {currentMerchant} = merchantService()
  const [currentDate, setCurrentDate] = useState(new Date());
  const {put} = notiService();
  useEffect(() => {
    const notiEvent = addNotificationReceivedListener(notification => {
      console.log(1)
      if(_.isEmpty(notification.request.content.title) || _.isEmpty(notification.request.content.body)) {
        return
      }
      Toast.show({
        type:"info",
        text1: notification.request.content.title || "Thông báo cửa hàng",
        text2: notification.request.content.body || "Cửa hàng có hoạt động mới"
      })
      put({
        id: notification.request.identifier,
        title: notification.request.content.title || "Thông báo cửa hàng",
        body: notification.request.content.body || "Cửa hàng có hoạt động mới",
        createdAt: new Date(),
        type: notification.request.content.data.type || "default"
      })
    })
    return () => notiEvent.remove()
  }, [])

  useEffect(() => {
    loadProducts()
    filterByDate()
  }, [JSON.stringify(currentMerchant)])

  useEffect(() => {
    filterByDate()
  }, [currentDate])
  
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
