import { pictonBlue, red, white } from "@/constants/Pallete";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { useState } from "react";

type CardProductOrderProp = {
  state?: boolean,
  name?: string,
  price?: number,
  amount: number
}

export default function CardProductOrder(props: CardProductOrderProp) {
  const [cardForcus, setCardFocus] = useState(!!props.state);
  let [count, setCount] = useState(props.amount);

  const descrease = () => {
    if(count == 1) {
      setCardFocus(false);
    }
    setCount(--count)
  }

  const focusHandle = () => {
    !cardForcus && setCardFocus(true);
    setCount(++count) 
  }

  const disable = () => {
    setCount(0),
    setCardFocus(false);
  }

  return (
    <TouchableOpacity 
      style={{...styles.container, ...(cardForcus ? styles.containerActive : {})}}
      onPress={focusHandle}
    >
      <Image source={require("@/assets/images/product-draw.jpg")} style={styles.image} />
      <View style={{...styles.actionContainer, ...(!cardForcus ? styles.actionHide : {})}}>
        <View style={styles.countGroup}>
          <TouchableOpacity onPress={descrease}>
            <TabBarIcon name='remove' size={25} />
          </TouchableOpacity>
          <Text>{count}</Text>
          <TouchableOpacity>
            <TabBarIcon name='add' size={25} onPress={() => setCount(++count)} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.resetBtn} onPress={disable}>
          <TabBarIcon name='trash' size={30} color={red[500]} />
        </TouchableOpacity>
      </View>
      
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
  containerActive: {
    backgroundColor: pictonBlue[200],
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5
  },
  actionContainer: {
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
  },
  actionHide: {
    display: 'none'
  },
  countGroup: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 2,
    paddingHorizontal: 5,
    borderColor: pictonBlue[500],
    borderRadius: 40,
    backgroundColor: white[100],
    marginHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center'
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