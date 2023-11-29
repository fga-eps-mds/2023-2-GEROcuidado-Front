import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Rotina from "../private/pages/cadastrarRotina";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

describe("Cadastrar Rotina component", () => {
      it("renderiza corretamente", async () => {
        (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
          if (key === "idoso") {
            return Promise.resolve(JSON.stringify({ id: 1 }));
          } else if (key === "token") {
            return Promise.resolve("mockedToken");
          }
          return Promise.resolve(null);
        });
        await waitFor(() => render(<Rotina />));
      });
});
