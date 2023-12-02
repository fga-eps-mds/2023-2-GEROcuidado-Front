import React from "react";
import { render } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CriaPublicacao from "../private/pages/criaPublicacao";

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

describe("CriaPublicacao", () => {
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

    render(<CriaPublicacao />);
  });
});
