import { pictonBlue, white } from "@/constants/Pallete";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Text, Button } from "react-native";
import { CodeField, Cursor, isLastFilledCell, MaskSymbol, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";

export default function SetupPINScreen() {
  const [value, setValue] = useState('');
  const [initValue, setInitValue] = useState('');
  const [isVerifing, setVerifing] = useState(false);
  const [title, setTitle] = useState('Tạo mã PIN');
  const ref = useBlurOnFulfill({value, cellCount: 6});

  const submitHandle = async () => {
    if(!isVerifing) {
      setInitValue(value);
      setValue("");
      setVerifing(true);
      setTitle("Xác nhận lại")
      return;
    }
    if(value === initValue) {
      AsyncStorage.setItem("pin", value)
      AsyncStorage.setItem("verify_pin", "ok")
      router.replace("/(drawer)/(tabs)/home");
      return;
    }
    setValue("");
    setVerifing(false)
    setTitle("Tạo mã PIN")
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


  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>{title}</Text>
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

      <Button title="Xác minh" onPress={submitHandle}/>
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