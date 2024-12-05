import CardProduct from "@/components/product/CardProduct";
import ModalActionProduct from "@/components/product/ModalActionProduct";
import ResetOnPullToRefresh from "@/components/ResetOnPullRequest";
import { StyleSheet, View } from "react-native";

export default function Menu() {
  return (
    <View style={{padding: 20, flex: 1}}>
      <ResetOnPullToRefresh contentContainerStyle={styles.container}>
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </ResetOnPullToRefresh>
      <ModalActionProduct />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20
  }
});
