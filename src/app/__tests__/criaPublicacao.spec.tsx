import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
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

  it("Salvar com titulo muito grande", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <CriaPublicacao />,
    );

    const titulo = getByPlaceholderText("Título");
    const publicar = getByText("Publicar");

    act(() => {
      fireEvent.changeText(
        titulo,
        "Por que o livro de matemática está sempre triste? Porque tem muitos problemas! hahahahahahhahahahahhahahaahahahahahahhahahahahahahahahahahahhahaahahahahahahahahah",
      );
      fireEvent.press(publicar);
    });
    const erroTitulo = getByText("Deve ter no máximo 100 caracteres!");

    expect(erroTitulo).toBeTruthy();
  });

});
