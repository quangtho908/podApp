import { white } from "@/constants/Pallete";
import styleText from "@/styles/text";
import { Image, StyleSheet, View, Text } from "react-native";

export default function CardProductPayment() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('@/assets/images/product-draw.jpg')}/>
      <View style={styles.contentContainer}>
        <View style={{
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <Text style={{...styleText.text}}>Hamburger</Text>
          <Text>Số lượng: 2</Text>
        </View>
        <Text>Đơn giá: 100.000</Text>
        <Text style={{...styleText.text}}>TỔNG TIỀN: 200.000</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: white[50],
    shadowColor: '#000',
    flexDirection: 'row',
    gap: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    paddingVertical: 10,
    flex: 1,
    paddingRight: 20,
    gap: 5
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5
  }
})