import { orange } from "@/constants/Pallete"
import { Ionicons } from "@expo/vector-icons"
import { ComponentProps } from "react"
import { StyleSheet, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

type InputIconProps = {
  icon: ComponentProps<typeof Ionicons>['name']
  onPress: () => void,
  value: string
}

export default function InputIcon (props: InputIconProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Ionicons style={styles.icon} name={props.icon} size={20} color={orange[500]}/>
      <Text>{props.value}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5
  },
  icon: {
      padding: 10,
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: '#fff',
      color: '#424242',
      cursor: "pointer"
  },
})