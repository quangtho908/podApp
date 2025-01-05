import { white } from "@/constants/Pallete";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import tablesService, { Table } from "@/service/tables/tablesStore";
import useModal from "@/service/modal/modal";

export default function TableItem({table}: {table: Table}) {
  const {modals, setVisible} = useModal()
  const {setCurrentTable} = tablesService()

  const onFocus = () => {
    setCurrentTable(table)
    setVisible("edit_table", true)
  }

  const onLongPress = () => {
    if(table.isUsed) {
      return;
    }
    setCurrentTable(table)
    setVisible("action_table", true)
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