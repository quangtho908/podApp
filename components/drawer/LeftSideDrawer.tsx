import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { orange, pictonBlue, white } from "@/constants/Pallete";
import { Link, useRouter } from "expo-router";
import ResetOnPullToRefresh from "../ResetOnPullRequest";
import ItemStore from "../store/ItemStore";
import { useEffect } from "react";
import merchantService from "@/service/merchant/merchantStore";
import * as _ from "lodash";
import AddStoreBtn from "../store/AddStoreBtn";
import { AvatarBtn } from "./AvatarBtn";
import { TabBarIcon } from "../navigation/TabBarIcon";
import styleText from "@/styles/text";

export default function LeftSideDrawer(props: any) {
  const router = useRouter();
  const {filter, merchants, unauth, setUnauth} = merchantService()
  useEffect(() => {
    reloadMerchants()
  }, [JSON.stringify(merchants)])
  const reloadMerchants = async () => {
    await filter()
    if(unauth) {
      setUnauth(false)
      router.replace("/")
      return;
    }
  }
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{flex: 2, backgroundColor: white[100]}}>
        <AddStoreBtn />
        <ResetOnPullToRefresh reload={reloadMerchants}>
          {merchants.map((merchant) => <ItemStore merchant={merchant} key={merchant.id} />)}
        </ResetOnPullToRefresh>
        <AvatarBtn />
      </View>
      <View style={{ flex: 5, backgroundColor: white[50] }}>
        <View style={styles.head}>
          <View style={styles.headerStorefront}>
            <TabBarIcon name="storefront" color={white[50]} style={{textAlign:"center"}} size={50} />
          </View>
          <Text style={{...styleText.textTitle}} >Cửa hàng</Text>
          <Text style={{...styleText.sText}} >Cửa hàng</Text>
        </View>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => router.push("/(drawer)/(tabs)/home")} style={styles.actionLink}>
            <TabBarIcon name="home" color={orange[700]} />
            <Text style={{...styleText.sText}}>Trang chủ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(drawer)/bankAccounts")} style={styles.actionLink}>
            <TabBarIcon name="card" color={orange[700]} />
            <Text style={{...styleText.sText}}>Quản lý thanh toán</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(drawer)/table")} style={styles.actionLink}>
            <TabBarIcon name="receipt" color={orange[700]} />
            <Text style={{...styleText.sText}}>Quản lý bàn</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(drawer)/menu")} style={styles.actionLink}>
            <TabBarIcon name="fast-food" color={orange[700]} />
            <Text style={{...styleText.sText}}>Quản lý thực đơn</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(drawer)/menu")} style={styles.actionLink}>
            <TabBarIcon name="people" color={orange[700]} />
            <Text style={{...styleText.sText}}>Quản lý nhân viên</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  head: {
    backgroundColor: white[100],
    alignItems: "center",
    gap: 10,
    paddingVertical: 20
  },
  menu: {
    alignItems: "center"
  },
  headerStorefront: {
    backgroundColor: pictonBlue[800],
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center"
  },
  actionLink: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: "100%",
    gap: 10,
    borderBottomColor: white[100],
    borderBottomWidth: 1
  }
})