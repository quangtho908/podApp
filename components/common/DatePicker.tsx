import { View } from "react-native";
import InputIcon from "./InputIcon";
import { getDate } from "@/utils/convertData";
import { useState } from "react";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export default function DatePicker ({onChange}: {onChange: (date: Date) => void}) {
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)

  const onPress = () => {
    setShow(true)
  }

  const onChangeInput = (event: DateTimePickerEvent, newDate?: Date) => {
    setShow(false)
    setDate(newDate || new Date())
    onChange(newDate || new Date())
  }
  
  return (
    <View>
      <InputIcon icon='calendar' value={getDate(date)} onPress={onPress} />
      {show && <RNDateTimePicker value={date} onChange={onChangeInput} />}
    </View>
  )
}