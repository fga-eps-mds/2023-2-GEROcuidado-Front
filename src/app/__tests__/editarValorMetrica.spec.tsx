import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "@react-native-async-storage/async-storage/jest/async-storage-mock";
import VisualizarMetrica from "../private/pages/visualizarMetrica";

describe("EditarMetrica Component", () => {
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

    render(<VisualizarMetrica />);
  });
});
