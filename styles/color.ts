import { green, orange, pictonBlue, red, white } from "@/constants/Pallete";
import { StyleSheet } from "react-native";

const color = StyleSheet.create({
  textBlue500: {
    color: pictonBlue[500]
  },
  textBlue700: {
    color: pictonBlue[700]
  },
  textWhite50: {
    color: white[50]
  },
  textWhite500: {
    color: white[500]
  },
  textRed300: {
    color: red[300]
  },
  textRed500: {
    color: red[500]
  },
  textRed700: {
    color: red[700]
  },
  textOrange500: {
    color: orange[500]
  },
  textOrange600: {
    color: orange[600]
  },
  textGreen500: {
    color: green[500]
  },
  textGreen700: {
    color: green[700]
  }
})

export default color;