import { View, Text, Button } from "react-native";
import { pictonBlue, white } from "@/constants/Pallete";
import { Link, useRouter } from "expo-router";
import ResetOnPullToRefresh from "../ResetOnPullRequest";
import ItemStore from "../store/ItemStore";

export default function LeftSideDrawer(props: any) {
  const router = useRouter();
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{flex: 2, paddingTop: 25, backgroundColor: white[100]}}>
        <ResetOnPullToRefresh>
          <ItemStore />
        </ResetOnPullToRefresh>
      </View>
      <View style={{ flex: 5, padding: 10, paddingTop: 25 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Menu</Text>
        <Button title="Home" onPress={() => router.push('/(drawer)/(tabs)')} />
        <Link href="/login" style={{color: pictonBlue[500], marginTop: 20}}>Login</Link>
        <Link href="/(drawer)/table" style={{color: pictonBlue[500], marginTop: 20}}>Table</Link>
      </View>
    </View>
  )
}