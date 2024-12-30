import EmployeeItem from "@/components/employee/employeeItem";
import ResetOnPullToRefresh from "@/components/ResetOnPullRequest";
import employeesService from "@/service/employee/employee";
import merchantService from "@/service/merchant/merchantStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Toast from 'react-native-toast-message';

export default function EmployeePage () {
  const {filter, employees, unauth} = employeesService()
  const {currentMerchant} = merchantService()
  const router = useRouter()
  useEffect(() => {
    loadEmployee()
  }, [])

  const loadEmployee = async () => {
    await filter({merchantId: currentMerchant})
    if(unauth) {
      router.replace("/")
      return;
    }
  }

  return (
    <ResetOnPullToRefresh reload={loadEmployee} contentContainerStyle={styles.container}>
      {employees.map(employee => <EmployeeItem employee={employee} key={employee.phoneNumber} />)}
    </ResetOnPullToRefresh>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10
  }
})