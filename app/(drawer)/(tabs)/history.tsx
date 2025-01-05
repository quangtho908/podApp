import DatePicker from "@/components/common/DatePicker";
import PrimaryButton from "@/components/common/PrimaryButton";
import ResetOnPullToRefresh from "@/components/common/ResetOnPullRequest";
import SwitchBtn from "@/components/common/SwitchBtn";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import CardOrderPayment from "@/components/orderPayment/CardOrderPayment";
import { pictonBlue, white } from "@/constants/Pallete";
import merchantService from "@/service/merchant/merchantStore";
import orderPaymentService from "@/service/orderPayments/orderPaymentStore";
import { convertToDatePattern } from "@/utils/convertData";
import { useRouter } from "expo-router";
import _ from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HistoryScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bankMethod, setBankMethod] = useState(false)
  const {orderPayments, filter, unauth, setUnauth} = orderPaymentService()
  const {currentMerchant} = merchantService()
  const [page, setPage]  = useState(0)
  const router = useRouter()

  useEffect(() => {
    if(_.isEmpty(orderPayments)) {
      setPage(0)
    }
  }, [JSON.stringify(orderPayments)])

  useEffect(() => {
    filterByDate()
  }, [currentDate, bankMethod, page])

  const filterByDate = async () => {
    const date = moment(currentDate).startOf('day').toDate()
    const toDate = moment(date).add(1, 'day').toDate()
    await filter({
      merchantId: currentMerchant,
      paymentMethod: bankMethod ? "bank" : "cash",
      fromDate: convertToDatePattern(date),
      toDate: convertToDatePattern(toDate),
      page
    })
    if(unauth) {
      setUnauth(false)
      router.replace("/")
      return
    }
  }

  const onChageDatePicker = (date: Date) => {
    setCurrentDate(date)
    setPage(0)
  }

  const toogleMethodPayment = () => {
    setBankMethod(!bankMethod)
    setPage(0)
  }

  return (
    <View style={styles.container}>
      <DatePicker onChange={onChageDatePicker} />
      <View style={styles.switchPaymentMethod}>
        <Text>Tiền mặt</Text>
        <SwitchBtn isEnabled={bankMethod} toggleSwitch={toogleMethodPayment} />
        <Text>Ngân hàng</Text>
      </View>
      <View style={styles.paginationContainer}>
        {page > 0 && (
          <TouchableOpacity style={styles.pagination} onPress={() => setPage(page - 1)}>
            <TabBarIcon name="arrow-back" size={20} color={white[50]} />
          </TouchableOpacity>
        )}
        <Text style={{textAlign: "center"}}>Trang {page + 1}</Text>
        <TouchableOpacity style={styles.pagination} onPress={() => setPage(page + 1)}>
          <TabBarIcon name="arrow-forward" size={20} color={white[50]} />
        </TouchableOpacity>
      </View>
      <ResetOnPullToRefresh contentContainerStyle={{gap: 10}} reload={filterByDate}>
        {orderPayments.map(orderPayment => <CardOrderPayment orderPayment={orderPayment} key={orderPayment.order.id} />)}
      </ResetOnPullToRefresh>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 100,
  },
  switchPaymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    width: 70,
    gap: 5
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    marginBottom: 10
  },
  pagination: {
    backgroundColor: pictonBlue[800],
    padding: 5,
    borderRadius: 5,
    width: 30,
    height: 30
  }
})