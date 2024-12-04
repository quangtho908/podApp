import { white } from "@/constants/Pallete";
import styleText from "@/styles/text";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";

export default function BankSelectItem() {
  const router = useRouter();

  const onChoose = () => {
    router.back()
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onChoose}>
      <Image 
        style={styles.bankImage}
        source={{
          uri: 'https://api.vietqr.io/img/ACB.png'
        }} 
      />
      <View style={{alignItems: 'flex-end', gap: 5}}>
        <Text style={{...styleText.text}}>NGUYEN QUANG THO</Text>
        <Text>0374060165</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
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
    width: 100,
  },
})