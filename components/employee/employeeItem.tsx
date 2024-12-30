import { white } from "@/constants/Pallete";
import { Employee } from "@/service/employee/employee";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function EmployeeItem ({employee}: {employee: Employee}) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={{flex: 1}}>
        <Text>{employee.phoneNumber}</Text>
        <Text>{employee.email}</Text>
      </View>
      <Text>{employee.role}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white[50],
    padding: 15,
    borderRadius: 5,
    shadowColor: white[800],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  }
})