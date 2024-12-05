import { pictonBlue, white } from "@/constants/Pallete";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import useModalProduct, { ModalProductType } from "./services/modalProduct";

type CardProductOrderProp = {
  state?: boolean,
  name?: string,
  price?: number,
  amount: number
}


export default function CardProduct() {
  const router = useRouter();
  const {modals, setProps} = useModalProduct()
  const modalActionProduct: any = modals.get(ModalProductType.Action);
  const onFocus = () => {
    router.push('/updateProduct');
  }

  const onLongPress = () => {
    setProps(ModalProductType.Action, {
      ...modalActionProduct,
      visible: true
    })
  }

  return (
    <TouchableOpacity 
      style={{...styles.container}}
      onPress={onFocus}
      onLongPress={onLongPress}
    >
      <Image source={require("@/assets/images/product-draw.jpg")} style={styles.image} />
      <Text style={{...styles.textCenter, ...styles.textBold}}>Hamburger</Text>
      <Text style={styles.textCenter}>100.000</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white[50],
    alignSelf: 'flex-start',
    borderRadius: 10,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 10, 
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5
  },
  textCenter: {
    textAlign: 'center'
  },
  textBold: {
    fontWeight: '700'
  },
  resetBtn: {
    backgroundColor: white[50],
    flex: 1,
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 10,
    margin: 'auto',
    marginTop: 10
  }
})