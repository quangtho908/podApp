import { pictonBlue, white } from "@/constants/Pallete";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { CodeField, Cursor, isLastFilledCell, MaskSymbol, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function InputPINScreen() {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const router = useRouter();
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const submitPin = async () => {
    const pin = await AsyncStorage.getItem("pin")
    if(pin === value) {
      await AsyncStorage.setItem("verify_pin", "ok")
      router.replace("/")
      return
    }
  }

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

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Nhập mã PIN</Text>
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

      <Button title="Xác minh" onPress={submitPin}/>
    </SafeAreaView>
  )
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