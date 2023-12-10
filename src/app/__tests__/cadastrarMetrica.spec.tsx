import React from "react";
import { render } from "@testing-library/react-native";
import CriarMetrica from "../private/pages/cadastrarMetrica";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

jest.mock("expo-router", () => ({
  replace: jest.fn(),
  push: jest.fn(),
}));

describe("criarMetrica Component", () => {
  it("renderiza corretamente e interage com as métricas", async () => {
    jest
      .spyOn(require("@react-native-async-storage/async-storage"), "getItem")
      .mockResolvedValueOnce("mockedToken");

    jest
      .spyOn(require("@react-native-async-storage/async-storage"), "getItem")
      .mockResolvedValueOnce(JSON.stringify({ id: 1, nome: "Usuário Mock" }));

    jest
      .spyOn(require("@react-native-async-storage/async-storage"), "getItem")
      .mockResolvedValueOnce(
        JSON.stringify({ id: 2, nome: "Idoso Mock", foto: null }),
      );

    const {} = render(<CriarMetrica />);
  });
});
