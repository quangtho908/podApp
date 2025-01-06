import { white } from "@/constants/Pallete";
import { Notification } from "@/service/notifications/notificationStore";
import styleText from "@/styles/text";
import { getDate, getTime } from "@/utils/convertData";
import { notiColor, TypeNoti } from "@/utils/notiColor";
import { StyleSheet, Text, View } from "react-native";

export default function NotificationItem ({notification}: {notification: Notification}) {
  return (
    <View style={{
      ...styles.container, 
      borderLeftWidth: 2,
      borderLeftColor: notiColor[notification.type as TypeNoti] || notiColor["default"]
    }}>
      <Text style={{...styleText.textTitle}}>{notification.title}</Text>
      <Text>{getTime(notification.createdAt)} {getDate(notification.createdAt)}</Text>
      <Text>{notification.body}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white[50],
    padding: 20,
    borderRadius: 10,
    shadowColor: white[800],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    gap: 5
  }
})