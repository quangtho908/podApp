import { pictonBlue, white } from "@/constants/Pallete";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Pressable, Button } from "react-native";
import {  CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";

export default function VerifyMailPage() {
  const [value, setValue] = useState('');
  const [isResend, setIsResend] = useState(false);
  let [countDown, setCountDown] = useState(59);
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const resend = () => {
    setCountDown(59);
    setIsResend(false);
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
        renderCell={({index, symbol, isFocused}) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      <View style={styles.resendText}>
        <Text> Đợi sau {countDown} để gửi lại mã </Text>
        <Pressable disabled={!isResend} onPress={resend}>
          <Text style={isResend ? styles.pressableTextActive : styles.pressableTextDisable}> Gửi lại</Text>
        </Pressable>
      </View>
      <Button title="Xác minh" onPress={() => router.push("/setPassword")}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {padding: 20, minHeight: 300, gap: 20},
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
    width: 280,
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: pictonBlue[500],
    borderBottomWidth: 2,
  },
});