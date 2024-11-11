import { pictonBlue, white } from "@/constants/Pallete";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, StyleSheet, TouchableOpacity} from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

function HeaderButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity 
      {...props}
      style={styles.container}
    >
      <Image 
        source={require('@/assets/images/react-logo.png')} 
        style={styles.image}
      />
      <Text style={styles.title}>IPOT</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: pictonBlue[500],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5
  },
  title: {
    fontWeight: "bold",
    marginLeft: 3,
    color: white[50]
  },
  image: {
    height: 30,
    width: 30
  }
})

export default HeaderButton;