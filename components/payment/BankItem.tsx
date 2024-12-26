import { white } from "@/constants/Pallete";
import bankService, { Bank } from "@/service/banks/bankService";
import styleText from "@/styles/text";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import useModalBank from "./services/modalBank";

export default function BankItem({bank}: {bank: Bank}) {
  const {setCurrentBank} = bankService()
  const {setProps} = useModalBank()
  const onChoose = () => {
    setCurrentBank(bank)
    setProps("chooseBank", {visible: false})
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onChoose}>
      <Image 
        style={styles.bankImage}
        source={{
          uri: bank.logo
        }} 
      />
      <Text>{bank.shortName}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingRight: 20,
    justifyContent: 'space-between',
    backgroundColor: white[50],
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bankImage: {
    width: 70
  },
})