import PrimaryButton from "@/components/common/PrimaryButton";
import ResetOnPullToRefresh from "@/components/common/ResetOnPullRequest";
import ChooseMerchantItem from "@/components/store/ChooseMerchantItem";
import merchantService from "@/service/merchant/merchantStore";
import { useRouter } from "expo-router";
import _ from "lodash";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function ChooseMerchant () {
  const router = useRouter();
  const {filter, merchants, unauth, setUnauth} = merchantService()
  useEffect(() => {
    reloadMerchants()
  }, [])

  const reloadMerchants = async () => {
    await filter()
    if(unauth) {
      setUnauth(false)
      router.replace("/")
      return;
    }
  }
  return (
    <View style={styles.container}>
      <PrimaryButton title="Tạo merchant mới" onPress={() => router.push("/merchant/createMerchant")} />
      <ResetOnPullToRefresh contentContainerStyle={{gap: 10}}>
        {merchants.map(merchant => <ChooseMerchantItem merchant={merchant} key={merchant.id} />)}
      </ResetOnPullToRefresh>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 20
  }
})