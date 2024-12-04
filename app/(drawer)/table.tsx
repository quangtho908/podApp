import ResetOnPullToRefresh from "@/components/ResetOnPullRequest"
import ModalActionTable from "@/components/table/ModalActionTable"
import ModalCreateTable from "@/components/table/ModalCreateTable"
import ModalEditTable from "@/components/table/ModalEditTable"
import TableItem from "@/components/table/TableItem"
import { View, StyleSheet } from "react-native"

export default function TableScreen() {
  return (
    <View style={{flex: 1}}>
      <ResetOnPullToRefresh contentContainerStyle={styles.container}>
        <TableItem />
        <TableItem />
        <TableItem />
        <TableItem />
        <TableItem />
        <TableItem />
      </ResetOnPullToRefresh>
      <ModalActionTable />
      <ModalEditTable />
      <ModalCreateTable />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
})