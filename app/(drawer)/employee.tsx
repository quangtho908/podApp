import EmployeeItem from "@/components/employee/employeeItem";
import ModalActionEmployee from "@/components/employee/ModalActionEmployee";
import ResetOnPullToRefresh from "@/components/ResetOnPullRequest";
import employeesService from "@/service/employee/employee";
import merchantService from "@/service/merchant/merchantStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function EmployeePage () {
  const {filter, employees, unauth} = employeesService()
  const {currentMerchant} = merchantService()
  const router = useRouter()
  useEffect(() => {
    loadEmployee()
  }, [JSON.stringify(currentMerchant)])

  const loadEmployee = async () => {
    await filter({merchantId: currentMerchant})
    if(unauth) {
      router.replace("/")
      return;
    }
  }

  return (
    <View>
      <ResetOnPullToRefresh reload={loadEmployee} contentContainerStyle={styles.container}>
        {employees.map(employee => <EmployeeItem employee={employee} key={employee.phoneNumber} />)}
      </ResetOnPullToRefresh>
      <ModalActionEmployee />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10
  }
})