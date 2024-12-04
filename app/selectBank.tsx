import { Modal, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import ResetOnPullToRefresh from "../components/ResetOnPullRequest";
import styleText from "@/styles/text";
import { useRouter } from "expo-router";
import color from "@/styles/color";
import { white } from "@/constants/Pallete";
import BankSelectItem from "@/components/payment/BankSelectItem";

export default function ModalSelectBank() {
  const router = useRouter();

  const cancel = () => {
    router.back();
  }

  const accept = () => {
    router.back();
  }

  return (
    <View>
      <View style={{margin: 'auto', paddingVertical: 15}}>
        <Text style={{...styleText.textTitle}} >Chọn ngân hàng</Text>
      </View>
      <ResetOnPullToRefresh contentContainerStyle={styles.container}>
        <BankSelectItem />
      </ResetOnPullToRefresh>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    borderBottomWidth: 2,
    borderBottomColor: white[200],
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    gap: 10,
    padding: 20
  }
})