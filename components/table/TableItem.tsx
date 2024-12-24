import { white } from "@/constants/Pallete";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import useModalTable, { ModalTableType } from "./services/modalTable";
import tablesService, { Table } from "@/service/tables/tablesStore";

export default function TableItem({table}: {table: Table}) {
  const {setProps, modals} = useModalTable()
  const modalAction: any = modals.get(ModalTableType.Action);
  const editAction: any = modals.get(ModalTableType.Edit);
  const {setCurrentTable} = tablesService()

  const onFocus = () => {
    setCurrentTable(table)
    setProps(ModalTableType.Edit, {...editAction, visible: true})
  }

  const onLongPress = () => {
    if(table.isUsed) {
      return;
    }
    setCurrentTable(table)
    setProps(ModalTableType.Action, {...modalAction, visible: true})
  }

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onFocus}
      onLongPress={onLongPress}
    >
      <Image style={styles.image} source={require('@/assets/images/table_draw.jpg')} />
      <Text>{table.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: white[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: white[50]
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  }
})