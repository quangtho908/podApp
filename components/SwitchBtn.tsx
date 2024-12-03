import { pictonBlue, white } from "@/constants/Pallete";
import { useState } from "react";
import { Switch } from "react-native";

export default function SwitchBtn({
  isEnabled,
  toggleSwitch,
}: {
  isEnabled: boolean,
  toggleSwitch: () => void
}) {
  return (
    <Switch
      trackColor={{false: white[500], true: pictonBlue[300]}}
      thumbColor={isEnabled ? pictonBlue[400] : white[200]}
      ios_backgroundColor={white[500]}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  )
}