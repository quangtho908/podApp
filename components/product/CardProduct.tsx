import { white } from "@/constants/Pallete";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import useModalProduct, { ModalProductType } from "./services/modalProduct";
import productService, { Product } from "@/service/product/productsStore";
import { convertPrice } from "@/utils/convertData";
import _ from "lodash";


export default function CardProduct({product}: {product: Product}) {
  const router = useRouter();
  const {modals, setProps} = useModalProduct()
  const modalActionProduct: any = modals.get(ModalProductType.Action);
  const {setCurrentProduct} = productService()
  const onFocus = () => {
    setCurrentProduct(product)
    router.push('/products/updateProduct');
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
      {_.isEmpty(product.image) 
        ? <Image source={require("@/assets/images/product-draw.jpg")} style={styles.image} /> 
        : <Image source={{uri: product.image}} style={styles.image} />
      }
      
      <Text style={{...styles.textCenter, ...styles.textBold}}>{product.name}</Text>
      <Text style={styles.textCenter}>{convertPrice(product.price)}</Text>
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
    width: 150
  },
  image: {
    width: "100%",
    height: 130,
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