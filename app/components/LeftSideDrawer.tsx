import { View, Text, Button } from "react-native";
import ResetOnPullToRefresh from "./ResetOnPullRequest";
import { white } from "../common/colors";

export default function LeftSideDrawer(props: any) {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{flex: 1, padding: 10, paddingTop: 25, backgroundColor: white[100]}}>
        <ResetOnPullToRefresh />
      </View>
      <View style={{ flex: 3, padding: 10, paddingTop: 25 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Menu</Text>
        <Button title="Home" onPress={() => props.navigation.navigate('Home')} />
      </View>
    </View>
  )
}