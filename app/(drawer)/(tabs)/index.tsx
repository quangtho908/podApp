import CreateOrderButton from '@/components/CreateOrderButton';
import ModalOrderDetail from '@/components/order/ModalOrderDetail';
import OrderItem from '@/components/order/OrderItem';
import ResetOnPullToRefresh from '@/components/ResetOnPullRequest';
import { useRouter } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function HomeScreen() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <ResetOnPullToRefresh contentContainerStyle={{gap: 20, paddingBottom: 70}}>
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
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
