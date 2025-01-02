import { white } from "@/constants/Pallete";
import authService from "@/service/auth/authStore";
import employeesService, { Employee } from "@/service/employee/employee";
import useModal from "@/service/modal/modal";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function EmployeeItem ({employee}: {employee: Employee}) {
  const {setProps} = useModal()
  const {setCurrentEmployee} = employeesService()
  const {role} = authService()
  const onPress = () => {
    setCurrentEmployee(employee)
    setProps("employee_action", {
      visible: true
    })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={employee.role === "OWNER" || role !== "OWNER"}>
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