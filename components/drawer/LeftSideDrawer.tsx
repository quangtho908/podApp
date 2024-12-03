import { View, Text, Button } from "react-native";
import { pictonBlue, white } from "@/constants/Pallete";
import { Link } from "expo-router";
import ResetOnPullToRefresh from "../ResetOnPullRequest";
import ItemStore from "../store/ItemStore";

export default function LeftSideDrawer(props: any) {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{flex: 2, paddingTop: 25, backgroundColor: white[100]}}>
        <ResetOnPullToRefresh>
          <ItemStore />
        </ResetOnPullToRefresh>
      </View>
      <View style={{ flex: 5, padding: 10, paddingTop: 25 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Menu</Text>
        <Button title="Home" onPress={() => props.navigation.navigate('Home')} />
        <Link href="/login" style={{color: pictonBlue[500], marginTop: 20}}>Login</Link>
      </View>
    </View>
  )
}