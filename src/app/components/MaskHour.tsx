import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface MaskHourProps extends TextInputProps {
  inputMaskChange: (value: string) => unknown;
}

export default function MaskInput({
  inputMaskChange,
  ...textInput
}: Readonly<MaskHourProps>) {
  function handlechange(text: string) {
    const value = MaskHour(text);
    inputMaskChange(value);
  }

 function MaskHour(value: string) {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/, "$1:$2");

    if (value.startsWith("3")) {
        value = "";
    }

    if (value.startsWith("2") && value[1] > "3") {
        value = value[0];
    }

    if (value[3] > "5") {
        value = value.substring(0, 3);
    }

    return value;
}

  return (
    <TextInput onChangeText={(text) => handlechange(text)} {...textInput} />
  );
}
