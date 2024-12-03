import { green, orange, pictonBlue, red, white } from "@/constants/Pallete";
import { StyleSheet } from "react-native";

const color = StyleSheet.create({
  textBlue500: {
    color: pictonBlue[500]
  },
  textWhite50: {
    color: white[50]
  },
  textRed300: {
    color: red[300]
  },
  textRed500: {
    color: red[500]
  },
  textOrange500: {
    color: orange[500]
  },
  textGreen500: {
    color: green[500]
  }
})

export default color;