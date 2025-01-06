import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { TabBarIcon } from "../navigation/TabBarIcon";
import Badge from "../common/Badge";
import notiService from "@/service/notifications/notificationStore";
import { pictonBlue } from "@/constants/Pallete";
import { useRouter } from "expo-router";

export default function NotificationBtn () {
  const router = useRouter();
  const {unRead, setUnRead, newNoti} = notiService()
  const onPress = () => {
    setUnRead(false)
    router.push("/notification")
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <TabBarIcon name="notifications" color={pictonBlue[800]} />
      {newNoti > 0 && unRead && <Badge value={newNoti > 99 ? "+99" : newNoti.toString()} />    }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 30
  }
})