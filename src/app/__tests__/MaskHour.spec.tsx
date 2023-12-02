import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MaskInput from "../components/MaskHour";

function MaskHour(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/, "$1:$2");

  if (value[0] > "2") {
    value = "";
  }
  if (value[1] > "9") {
    value = value[0];
  }
  if (value[3] > "5") {
    value = value[0] + value[1] + value[2];
  }
  return value;
}

describe("MaskInput Component", () => {
  it("applies hour mask correctly", () => {
    const mockInputMaskChange = jest.fn();
    const { getByPlaceholderText } = render(
      <MaskInput inputMaskChange={mockInputMaskChange} placeholder="HH:MM" />,
    );

    const input = getByPlaceholderText("HH:MM");

    // Simula a entrada de dados
    fireEvent.changeText(input, "1234");

    // Verifica se a função inputMaskChange foi chamada com o valor mascarado
    expect(mockInputMaskChange).toHaveBeenCalledWith("12:34");
  });
});
