import ResetOnPullToRefresh from "@/components/common/ResetOnPullRequest"
import ModalActionTable from "@/components/table/ModalActionTable"
import ModalCreateTable from "@/components/table/ModalCreateTable"
import ModalEditTable from "@/components/table/ModalEditTable"
import TableItem from "@/components/table/TableItem"
import merchantService from "@/service/merchant/merchantStore"
import tablesService from "@/service/tables/tablesStore"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { View, StyleSheet } from "react-native"

export default function TableScreen() {
  const {tables, filter, unauth, setUnauth} = tablesService()
  const {currentMerchant} = merchantService();
  const router = useRouter()
  useEffect(() => {
    reload()
  }, [])

  const reload = async () => {
    filter({merchantId: currentMerchant})
    if(unauth) {
      setUnauth(false)
      router.replace("/")
      return
    }
  }

  return (
    <View style={{flex: 1}}>
      <ResetOnPullToRefresh contentContainerStyle={styles.container} reload={reload}>
        {tables.map(table => <TableItem table={table} key={table.id} />)}
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