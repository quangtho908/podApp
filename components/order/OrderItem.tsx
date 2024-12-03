import { pictonBlue, white } from "@/constants/Pallete";
import color from "@/styles/color";
import styleText from "@/styles/text";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TabBarIcon } from "../navigation/TabBarIcon";
import useModalOrderDetail from "@/service/modalOrderDetail";

export default function OrderItem () {
  const setVisible = useModalOrderDetail(state => state.setVisible)

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerContent} onPress={() => setVisible(true)}>
        <View style={{gap: 5}}>
          <Text>6:30</Text>
          <Text>2/12/2024</Text>
        </View>
        <View style={styles.viewContent}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{...styleText.textTitle}}>Bàn: 1</Text>
            <Text style={{...styleText.text, ...color.textBlue500}}>100.000</Text>
          </View>
          <Text>Sản phẩm: 2</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
            <TabBarIcon name={"refresh-circle-outline"} />
            <Text style={{...color.textBlue500}} >Chuẩn bị</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.action}>
          <Text style={{...styleText.text, ...color.textBlue500}}>Huỷ</Text>
          <TabBarIcon name='backspace' color={pictonBlue[500]}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action}>
          <TabBarIcon name='card' color={pictonBlue[500]}/>
          <Text style={{...styleText.text, ...color.textBlue500}}>Thanh Toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white[50],
    borderRadius: 5,
  },
  containerContent: {
    flexDirection: 'row',
    gap: 20,
    padding: 15,
  },
  viewContent: {
    gap: 5,
    flex: 1
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15
  }
})