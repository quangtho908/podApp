import { View, Text, Button } from "react-native";
import { pictonBlue, white } from "@/constants/Pallete";
import ListItemStore from "@/components/store/ListItemStore";
import { Link, Redirect } from "expo-router";

export default function LeftSideDrawer(props: any) {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{flex: 2, paddingTop: 25, backgroundColor: white[100]}}>
        <ListItemStore />
      </View>
      <View style={{ flex: 5, padding: 10, paddingTop: 25 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Menu</Text>
        <Button title="Home" onPress={() => props.navigation.navigate('Home')} />
        <Link href="/login" style={{color: pictonBlue[500], marginTop: 20}}>Login</Link>
        <Link href="/signup" style={{color: pictonBlue[500], marginTop: 20}}>Signup</Link>
      </View>
    </View>
  )
}