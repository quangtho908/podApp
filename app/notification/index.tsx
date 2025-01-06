import NotificationItem from "@/components/notifications/NotificationItem";
import notiService from "@/service/notifications/notificationStore";
import { ScrollView, StyleSheet } from "react-native";

export default function NotificationPage () {
  const {notifications} = notiService()
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {notifications.map(notification => <NotificationItem notification={notification} key={notification.id} />)}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10
  }
})