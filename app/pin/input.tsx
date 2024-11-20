import { pictonBlue, white } from "@/constants/Pallete";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";

export default function InputPINScreen() {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const params = useLocalSearchParams<{ query?: string }>();
  
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
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
        renderCell={({index, symbol, isFocused}) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      <Button title="Xác minh"/>
    </SafeAreaView>
  )
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