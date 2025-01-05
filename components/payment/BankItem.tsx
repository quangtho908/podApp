import { white } from "@/constants/Pallete";
import bankService, { Bank } from "@/service/banks/bankService";
import { StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import useModal from "@/service/modal/modal";

export default function BankItem({bank}: {bank: Bank}) {
  const {setCurrentBank} = bankService()
  const {setVisible} = useModal()
  const onChoose = () => {
    setCurrentBank(bank)
    setVisible("choose_bank", false)
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