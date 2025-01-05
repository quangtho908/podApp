import { pictonBlue, white } from "@/constants/Pallete";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { useRouter } from "expo-router";
import orderService from "@/service/orders/orderStore";
import { convertPrice } from "@/utils/convertData";
import bankAccountService from "@/service/bankAccounts/bankAccountsStore";
import * as _ from "lodash";
import { useEffect, useState } from "react";
import React from "react";
import { postRequest } from "@/apis/common";
import { AxiosResponse } from "axios";
import merchantService from "@/service/merchant/merchantStore";
import ButtonCamera from "../camera/ButtonCamera";
import useSpinner from "@/service/spinner";

export default function BottomBarPayment () {
  const router = useRouter();
  const {currentOrder} = orderService()
  const {currentBankAccount, resetCurrentBankAccount} = bankAccountService()
  const {currentMerchant} = merchantService()
  const [qr, setQr] = useState("")
  const [uri, setUri] = useState("")
  const {setVisible} = useSpinner()
  useEffect(() => {
    genQr()
  }, [JSON.stringify(currentBankAccount)])
  const genQr = async ( ) => {
    if(currentBankAccount.id <= 0) return
    const response = await postRequest("banks/u/genQr", {
      acqId: currentBankAccount.bank.bin,
      accountNo: currentBankAccount.accountNumber,
      amount: currentOrder.totalPrice.toString(),
      description: `Thanh toán đơn hàng số ${currentOrder.id}`,
      accountName: currentBankAccount.accountName
    })
    if(response.status === 401) {
      router.replace("/")
      return;
    }else if(response.status !== 200) {
      return
    }
    setQr((response as AxiosResponse).data.qrDataURL)
  }
  const cash = async () => {
    setVisible(true)
    const data = new FormData()
    data.append("orderId", currentOrder.id.toString())
    data.append("merchantId", currentMerchant.toString())
    data.append("price", currentOrder.totalPrice.toString())
    data.append("paymentMethod", "CASH");
    const response = await postRequest("orderPayments", data, {
      "Content-Type": "multipart/form-data"
    })
    if(response.status === 401) {
      setVisible(false)
      router.replace("/")
      return
    }else if(response.status !== 200) {
      setVisible(false)
      return;
    }
    setVisible(false)
    router.push("/payments/paymentSuccess")
  }

  const bank = async () => {
    setVisible(true)
    const data = new FormData()
    data.append("orderId", currentOrder.id.toString())
    data.append("merchantId", currentMerchant.toString())
    data.append("price", currentOrder.totalPrice.toString())
    data.append("paymentMethod", "BANK");
    if(!_.isEmpty(uri)) {
      const fileName = uri.split('/').pop();
      data.append("image", {name: fileName, uri, type: "image/*"} as any)
    }
    const response = await postRequest("orderPayments", data, {
      "Content-Type": "multipart/form-data"
    })
    if(response.status === 401) {
      setVisible(false)
      router.replace("/")
      return
    }else if(response.status !== 200) {
      setVisible(false)
      return;
    }
    setVisible(false)
    router.push("/payments/paymentSuccess")
  }

  const removeBankAccount = () => {
    resetCurrentBankAccount()
  }

  return (
    <View>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={{...styleText.text}}>Bàn số 1</Text>
          <Text style={{...styleText.text}}>
            Tổng cộng: <Text style={{...color.textBlue500}}>{convertPrice(currentOrder.totalPrice)}</Text>
          </Text>
        </View>
        <Text style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          ...styleText.text
        }}>THÔNG TIN THANH TOÁN</Text>
        <TouchableOpacity style={styles.bankInfoContainer} onPress={() => router.push('/payments/selectBank')}>
          {currentBankAccount.id > 0 && (
            <>
              <Image 
                style={styles.bankImage}
                source={{
                  uri: currentBankAccount.bank.logo
                }} 
              />
              <Text>{currentBankAccount.accountName}</Text>
              <TouchableOpacity onPress={removeBankAccount}>
                <TabBarIcon name="close" />
              </TouchableOpacity>
            </>
          )}
          {currentBankAccount.id <= 0 && <Text style={{margin: "auto"}}>Chọn tài khoản thanh toán</Text>}
        </TouchableOpacity>
        {currentBankAccount.id > 0 && !_.isEmpty(qr) && (
          <View style={{alignItems: 'center', gap: 10}}>
            <Image 
              style={styles.qr}
              source={{uri: qr}}
            />
            <ButtonCamera onChange={setUri} />
          </View>
        )}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={{...styles.action, backgroundColor: pictonBlue[800]}} onPress={cash}>
            <TabBarIcon name="wallet" color={white[50]}/>
            <Text style={{...styleText.text, ...color.textWhite50}}>Tiền mặt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.action, backgroundColor: (currentBankAccount.id > 0 ? pictonBlue[800] : white[300])}} onPress={bank} disabled={currentBankAccount.id <= 0}>
            <TabBarIcon name="card" color={white[50]} />
            <Text style={{...styleText.text, ...color.textWhite50}}>Chuyển khoản</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white[50],
    // position: 'absolute',
    bottom: 0,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: white[200]
  },
  bankInfoContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    alignItems: "center",
    backgroundColor: white[50],
    borderWidth: 1,
    borderColor: white[300]
  },
  bankImage: {
    width: 100,
    height: 20
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  qr: {
    width: 300,
    height: 350,
    resizeMode: 'stretch'
  }
})