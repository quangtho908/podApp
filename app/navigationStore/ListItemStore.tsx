import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import ItemStore from "./ItemStore";
import { useState } from "react";

export default function ListItemStore() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000); // Thực hiện reset sau 2 giây
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={{flexDirection: "column", alignItems: "center"}}>
        <ItemStore />
      </View>
    </ScrollView>
  )
}