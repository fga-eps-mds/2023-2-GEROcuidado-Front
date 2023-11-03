import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BackButton from "../components/BackButton";
import router from "expo-router";

// Mock da função router.back
jest.mock("expo-router", () => ({
  router: {
    canGoBack: jest.fn().mockReturnValue(true), // Simula que pode voltar
    back: jest.fn(),
  },
}));

describe("BackButton", () => {
  it("chama router.back() quando pressionado", () => {
    const { getByTestId } = render(<BackButton />);
    const pressableElement = getByTestId("back-button-pressable");

    fireEvent.press(pressableElement);

    // Verifica se a função router.back() é chamada quando o botão é pressionado
    expect(router.router.back).toHaveBeenCalled();
  });
});
