import { white } from "@/constants/Pallete";
import { Product } from "@/service/product/productsStore";
import styleText from "@/styles/text";
import { convertPrice } from "@/utils/convertData";
import * as _ from "lodash";
import { Image, StyleSheet, View, Text } from "react-native";
type CardProductPaymentProp = {
  id: number,
  state?: boolean,
  name?: string,
  price?: number,
  quantity: number,
  image?: string
}
export default function CardProductPayment(props : CardProductPaymentProp) {
  return (
    <View style={styles.container}>
      {_.isEmpty(props.image) 
        ? <Image source={require("@/assets/images/product-draw.jpg")} style={styles.image} /> 
        : <Image source={{uri: `${process.env.EXPO_PUBLIC_SERVER_HOST}/${props.image}`}} style={styles.image} />
      }
      <View style={styles.contentContainer}>
        <View style={{
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <Text style={{...styleText.text}}>{props.name}</Text>
          <Text>Số lượng: 2</Text>
        </View>
        <Text>Đơn giá: {convertPrice(props.price || 0)}</Text>
        <Text style={{...styleText.text}}>TỔNG TIỀN: {convertPrice((props.price || 0) * props.quantity)}</Text>
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