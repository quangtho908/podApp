import { pictonBlue, white } from "@/constants/Pallete";
import { useState } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function TableItem() {
  const [cardForcus, setCardFocus] = useState(false);

  const onFocus = () => {
    setCardFocus(!cardForcus)
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