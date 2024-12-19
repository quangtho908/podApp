import setOrderService from "@/service/orders/setOrder";
import color from "@/styles/color";
import { useNavigation } from "expo-router";
import { TouchableOpacity, Text, Alert} from "react-native";

export default function CancelCreateOrderBtn() {
  const navigation = useNavigation()
  const {destroy, order} = setOrderService()

  const onPress = () => {
    if(order.products.length <= 0) {
      navigation.goBack();
      return;
    }
    Alert.alert("Bạn muốn huỷ tạo đơn", "Bạn chắc chắn chứ",
      [
        {text: "Huỷ", style: "cancel"},
        {text: "Xác nhận", onPress: () => {
          destroy();
          navigation.goBack();
        }}
      ]
    )
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{...color.textBlue500}}>Huỷ</Text>
    </TouchableOpacity>
  )
}