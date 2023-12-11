import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VisualizarValoresMedidos from "../private/pages/visualizarValoresMedidos";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({ goBack: jest.fn() }),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

describe("VisualizarValoresMedidos", () => {
  test("The component rendered", () => {
    // Mock the response for AsyncStorage.getItem
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === "usuario") {
        return Promise.resolve(JSON.stringify({ id: 1 }));
      } else if (key === "token") {
        return Promise.resolve("mockedToken");
      }
      return Promise.resolve(null);
    });

    render(<VisualizarValoresMedidos />);
  });
});
