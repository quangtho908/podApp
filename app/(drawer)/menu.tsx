import CardProduct from "@/components/product/CardProduct";
import ModalActionProduct from "@/components/product/ModalActionProduct";
import ResetOnPullToRefresh from "@/components/ResetOnPullRequest";
import merchantService from "@/service/merchant/merchantStore";
import productService from "@/service/product/productsStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function Menu() {
  const {currentMerchant} = merchantService()
  const {products, filter, unauth, setUnauth} = productService()
  const router = useRouter()
  useEffect(() => {
    reload()
  }, [JSON.stringify(currentMerchant)])

  const reload = async () => {
    
    await filter({merchantId: currentMerchant})
    if(unauth) {
      setUnauth(false)
      router.replace("/")
      return
    }
  }


  return (
    <View style={{padding: 20, flex: 1}}>
      <ResetOnPullToRefresh reload={reload} contentContainerStyle={styles.container}>
        {products.map(product => <CardProduct key={product.id} product={product} />)}
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
