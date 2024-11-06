import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { pictonBlue, white } from "../common/colors";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useNavigation } from "expo-router";
import { TouchableOpacityProps } from "react-native-gesture-handler";

export default function CreateOrderButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...props}>
      <TabBarIcon size={50} name='add-circle' />
    </TouchableOpacity>
  );
}