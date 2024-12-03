import { StyleSheet, TouchableOpacity } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { TouchableOpacityProps } from "react-native-gesture-handler";

export default function CreateOrderButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...props} style={style.button}>
      <TabBarIcon size={70} name='add-circle' />
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 10
  }
})