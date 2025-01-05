import { pictonBlue, transparent, white } from "@/constants/Pallete";
import useModal from "@/service/modal/modal";
import setOrderService from "@/service/orders/setOrder";
import color from "@/styles/color";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ChooseTableItemProps = {
  id: number,
  name: string,
  isUsed: boolean
}

export default function ChooseTableItem(props: ChooseTableItemProps) {
  const [cardForcus, setCardFocus] = useState(false);
  const {setVisible: modalChooseTableVisible} = useModal()
  const {updateCurrentTable} = setOrderService()

  const onFocus = () => {
    setCardFocus(!cardForcus)
    updateCurrentTable(props)
    modalChooseTableVisible("choose_table", false)
  }

  return (
    <TouchableOpacity 
      style={{
        ...styles.container, 
        ...(cardForcus ? styles.containerActive : {})
      }}
      onPress={onFocus}
      disabled={props.isUsed}
    >
      <Image style={styles.image} source={require('@/assets/images/table_draw.jpg')} />
      <Text>{props.name}</Text>
      {props.isUsed && (<View style={styles.isUsed}>
        <Text style={{textAlign: "center", ...color.textWhite50}}>Đang sử dụng</Text>
      </View>)}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: white[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: white[50]
  },
  containerActive: {
    borderWidth: 5,
    borderColor: pictonBlue[500]
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  isUsed: {
    backgroundColor: transparent[50],
    width: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "center",
    borderRadius: 10
  }
})