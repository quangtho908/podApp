import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from "react-native";
import { orange, pictonBlue, white } from "@/constants/Pallete";
import { Link, useRouter } from "expo-router";
import ResetOnPullToRefresh from "../common/ResetOnPullRequest";
import ItemStore from "../store/ItemStore";
import { JSX, useEffect, useState } from "react";
import merchantService, { Merchant } from "@/service/merchant/merchantStore";
import * as _ from "lodash";
import AddStoreBtn from "../store/AddStoreBtn";
import { AvatarBtn } from "./AvatarBtn";
import { TabBarIcon } from "../navigation/TabBarIcon";
import styleText from "@/styles/text";
import authService from "@/service/auth/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userService from "@/service/user/userStore";

export default function LeftSideDrawer() {
  const router = useRouter();
  const {filter, merchants, unauth, setUnauth, currentMerchant} = merchantService()
  const {role, setRole} = authService()
  const {unauth: userUnauth, get} = userService()
  const [data, setData] = useState({} as Merchant | null)

  useEffect(() => {
    loadMenu()
    reloadMerchants()
  }, [JSON.stringify(currentMerchant)])

  const reloadMerchants = async () => {
    await Promise.all([
      filter(),
      get()
    ])
    if(unauth || userUnauth) {
      setUnauth(false)
      router.replace("/")
      return;
    }
    setData(_.find(merchants, {id: currentMerchant}) || null)
  }

  const loadMenu = async () => {
    const role = await AsyncStorage.getItem("role")
    if(!_.isEmpty(role)) {
      setRole(role || "STAFF")
    }
  }

  const renderMerchant = () => {
    const current: JSX.Element[] = []
    const list = merchants.map((merchant) => {
      if(merchant.id === currentMerchant) {
        current.push(<ItemStore merchant={merchant} key={merchant.id} />)
        return
      }
      return <ItemStore merchant={merchant} key={merchant.id} />
    })
    return [...current, ...list]
  }

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{flex: 2, backgroundColor: white[100]}}>
        <AddStoreBtn />
        <ResetOnPullToRefresh reload={reloadMerchants}>
          {renderMerchant()}
        </ResetOnPullToRefresh>
        <AvatarBtn />
      </View>
      <View style={{ flex: 5, backgroundColor: white[50] }}>
        <View style={styles.head}>
          <View style={styles.headerStorefront}>
            {_.isEmpty(data?.avatar) ?
              <TabBarIcon name="storefront" color={white[50]} style={{textAlign:"center"}} size={50} />
              : <Image source={{uri: data?.avatar}} style={styles.avatar} />
            }
          </View>
          <Text style={{...styleText.textTitle}} >{data?.name}</Text>
          <Text style={{...styleText.sText}} >Cửa hàng</Text>
        </View>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => router.push("/(drawer)/(tabs)/home")} style={styles.actionLink}>
            <TabBarIcon name="home" color={orange[700]} />
            <Text style={{...styleText.sText}}>Trang chủ</Text>
          </TouchableOpacity>
          {role === "OWNER" && (
            <TouchableOpacity onPress={() => router.push("/(drawer)/bankAccounts")} style={styles.actionLink}>
              <TabBarIcon name="card" color={orange[700]} />
              <Text style={{...styleText.sText}}>Quản lý thanh toán</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => router.push("/(drawer)/table")} style={styles.actionLink}>
            <TabBarIcon name="receipt" color={orange[700]} />
            <Text style={{...styleText.sText}}>Quản lý bàn</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(drawer)/menu")} style={styles.actionLink}>
            <TabBarIcon name="fast-food" color={orange[700]} />
            <Text style={{...styleText.sText}}>Quản lý thực đơn</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(drawer)/employee")} style={styles.actionLink}>
            <TabBarIcon name="people" color={orange[700]} />
            <Text style={{...styleText.sText}}>Quản lý nhân viên</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(drawer)/merchantSetting")} style={styles.actionLink}>
            <TabBarIcon name="settings" color={orange[700]} />
            <Text style={{...styleText.sText}}>Cài đặt cửa hàng</Text>
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
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 50
  }
})