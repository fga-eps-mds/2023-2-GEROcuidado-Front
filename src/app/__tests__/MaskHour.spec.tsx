import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MaskInput from "../components/MaskHour";

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

  it("Testa condição do if, quando o primeiro dígito é maior que 2", () => {
    const mockInputMaskChange = jest.fn();
    const { getByPlaceholderText } = render(
      <MaskInput inputMaskChange={mockInputMaskChange} placeholder="HH:MM" />,
    );

    const input = getByPlaceholderText("HH:MM");

    // Simula a entrada de dados
    fireEvent.changeText(input, "3222");

    // Verifica se a função inputMaskChange foi chamada com o valor mascarado
    expect(mockInputMaskChange).toHaveBeenCalledWith("");
  });

  it("Testa condição do if, quando o primeiro digito é igual a 2 e o segundo dígito é maior que 3", () => {
    const mockInputMaskChange = jest.fn();
    const { getByPlaceholderText } = render(
      <MaskInput inputMaskChange={mockInputMaskChange} placeholder="HH:MM" />,
    );

    const input = getByPlaceholderText("HH:MM");

    // Simula a entrada de dados
    fireEvent.changeText(input, "2400");

    // Verifica se a função inputMaskChange foi chamada com o valor mascarado
    expect(mockInputMaskChange).toHaveBeenCalledWith("2");
  });
  it("Testa condição do if, quando o terceiro dígito é maior que 5", () => {
    const mockInputMaskChange = jest.fn();
    const { getByPlaceholderText } = render(
      <MaskInput inputMaskChange={mockInputMaskChange} placeholder="HH:MM" />,
    );

    const input = getByPlaceholderText("HH:MM");

    // Simula a entrada de dados
    fireEvent.changeText(input, "1264");

    // Verifica se a função inputMaskChange foi chamada com o valor mascarado
    expect(mockInputMaskChange).toHaveBeenCalledWith("12:");
  });
});
