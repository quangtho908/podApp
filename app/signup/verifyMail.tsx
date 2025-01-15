import { postRequest } from "@/apis/common";
import { VerifyPath } from "@/constants/BaseModel";
import { pictonBlue, white } from "@/constants/Pallete";
import verifyService, { verifyRouter } from "@/service/auth/verifyStore";
import useSpinner from "@/service/spinner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { replace } from "lodash";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Pressable, Button } from "react-native";
import {  CodeField, Cursor, isLastFilledCell, MaskSymbol, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import Toast from "react-native-toast-message";

export default function VerifyMailPage() {
  const [value, setValue] = useState('');
  const [isResend, setIsResend] = useState(false);
  let [countDown, setCountDown] = useState(59);
  const {verify} = verifyService()
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const router = useRouter()
  const {setVisible} = useSpinner()
  const resend = async () => {
    setVisible(true)
    setCountDown(59);
    setIsResend(false);
    const response = await postRequest("users/reqVerify", {verifyAction: verify})
    if(response.status === 401) {
      setVisible(false)
      router.replace("/")
      return
    }else if(response.status !== 200) {
      Toast.show({
        type: "error",
        text1: "Có lỗi xảy ra",
        text2: "Quá trình yêu cầu bị lỗi"
      })
      setValue("")
      setVisible(false)
      return;
    }
    setVisible(false)
  }
  
  useEffect(() => {
    const countDownFactory = setInterval(() => {
      setCountDown((countDown) => {
        if(countDown > 0) return --countDown;
        clearInterval(countDownFactory)
        setIsResend(true);
        return countDown;
      })
    }, 1000)
  }, [isResend])
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = (
    {index, symbol, isFocused}: 
    {index: number, symbol: string, isFocused: boolean}
  ) => {
    let textChild = null;

    if (symbol) {
      textChild = (
        <MaskSymbol
          maskSymbol="•"
          isLastFilledCell={isLastFilledCell({index, value})}>
          {symbol}
        </MaskSymbol>
      );
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[styles.cellRoot, styles.cellText, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  const submit = async () => {
    setVisible(true)
    const response = await postRequest("users/verify", {
      code: value,
      verifyAction: verify
    })
    
    if(response.status === 401) {
      router.replace("/")
      setVisible(false)
      return
    }else if(response.status !== 200) {
      Toast.show({
        type: "error",
        text1: "Xác thực lỗi",
        text2: "Mã xác thực sai hoặc hết hạn"
      })
      setValue("")
      setVisible(false)
      return;
    }
    await AsyncStorage.setItem("active", "ok")
    router.replace(verifyRouter[verify])
    setVisible(false)
  }

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Nhập mã xác minh</Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={6}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />

      <View style={styles.resendText}>
        <Text> Đợi sau {countDown} để gửi lại mã </Text>
        <Pressable disabled={!isResend} onPress={resend}>
          <Text style={isResend ? styles.pressableTextActive : styles.pressableTextDisable}> Gửi lại</Text>
        </Pressable>
      </View>
      <Button title="Xác minh" onPress={submit}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {padding: 20, minHeight: 300, gap: 20, alignItems: "center"},
  title: {textAlign: 'center', fontSize: 30},
  resendText: {
    fontSize: 13,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  pressableTextActive: {
    color: pictonBlue[500],
  },
  pressableTextDisable: {
    color: white[400]
  },
  codeFieldRoot: {
    gap: 5,
  },
  cellRoot: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white[50],
    borderRadius: 5,
    shadowColor: white[800],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  cellText: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },
  focusCell: {
    backgroundColor: pictonBlue[100],
  },
});