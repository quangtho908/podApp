import CreateOrderButton from '@/components/CreateOrderButton';
import ModalOrderDetail from '@/components/order/ModalOrderDetail';
import OrderItem from '@/components/order/OrderItem';
import ResetOnPullToRefresh from '@/components/ResetOnPullRequest';
import merchantService from '@/service/merchant/merchantStore';
import orderService from '@/service/orders/orderStore';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function HomeScreen() {
  const router = useRouter()
  const {filter, orders} = orderService()
  const {merchant} = merchantService()

  useEffect(() => {
    filter({merchantId: merchant.id})
  }, [])

  const reload = () => {
    filter({merchantId: merchant.id})
  }

  return (
    <View style={styles.container}>
      <ResetOnPullToRefresh reload={reload} contentContainerStyle={{gap: 20, paddingBottom: 70}}>
        {orders.map(order => <OrderItem key={order.id} order={order}/> )}
      </ResetOnPullToRefresh>
      <CreateOrderButton onPress={() => router.push('/createOrder')} />
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
