import { View, Text, Button } from "react-native";
import { pictonBlue, white } from "@/constants/Pallete";
import { Link, useRouter } from "expo-router";
import ResetOnPullToRefresh from "../ResetOnPullRequest";
import ItemStore from "../store/ItemStore";
import { useEffect } from "react";
import merchantService from "@/service/merchant/merchantStore";
import * as _ from "lodash";
import cache from "@/service/cache";
import Logout from "../auth/logout";

export default function LeftSideDrawer(props: any) {
  const router = useRouter();
  const {filter, merchants} = merchantService()
  useEffect(() => {
    reloadMerchants()
  }, [JSON.stringify(merchants)])
  const reloadMerchants = async () => {
    await filter()
    const currentMerchant = await cache.get("currentMerchant")
    if(_.isEmpty(merchants) && _.isEmpty(currentMerchant)) {
      router.push("/merchant/createMerchant")
    }
  }
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{flex: 2, paddingTop: 25, backgroundColor: white[100]}}>
        <ResetOnPullToRefresh reload={reloadMerchants}>
          {merchants.map((merchant) => <ItemStore merchant={merchant} key={merchant.id} />)}
        </ResetOnPullToRefresh>
      </View>
      <View style={{ flex: 5, padding: 10, paddingTop: 25 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Menu</Text>
        <Button title="Home" onPress={() => router.push('/(drawer)/(tabs)')} />
        <Link href="/login" style={{color: pictonBlue[500], marginTop: 20}}>Login</Link>
        <Link href="/(drawer)/table" style={{color: pictonBlue[500], marginTop: 20}}>Table</Link>
        <Link href="/(drawer)/menu" style={{color: pictonBlue[500], marginTop: 20}}>Menu</Link>
        <Link href="/payments/bankAccounts" style={{color: pictonBlue[500], marginTop: 20}}>Bank Account</Link>
        <Logout />
      </View>
    </View>
  )
}