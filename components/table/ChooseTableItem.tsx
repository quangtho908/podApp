import { pictonBlue, white } from "@/constants/Pallete";
import useModalChooseTable from "@/service/modalChooseTable";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ChooseTableItem() {
  const [cardForcus, setCardFocus] = useState(false);
  const setModalChooseTable = useModalChooseTable(state => state.setVisible)
  const onFocus = () => {
    setCardFocus(!cardForcus)
    setModalChooseTable(false)
  }

  return (
    <TouchableOpacity 
      style={{...styles.container, ...(cardForcus ? styles.containerActive : {})}}
      onPress={onFocus}
    >
      <Image style={styles.image} source={require('@/assets/images/table_draw.jpg')} />
      <Text>Bàn 1</Text>
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
  }
})