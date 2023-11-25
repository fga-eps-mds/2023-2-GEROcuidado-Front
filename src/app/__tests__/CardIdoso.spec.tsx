import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import CardIdoso from "../components/CardIdoso";

const mockItem = {
  id: 1,
  nome: "Nome do Idoso",
  foto: "data:image/png;base64,base64-encoded-image-data",
  dataNascimento: "1990-01-01",
  idUsuario: 123,
  telefoneResponsavel: "123456789",
  dataHora: "2023-01-01T12:00:00",
};

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

describe("CardIdoso", () => {
  it("renderiza o componente CardIdoso com o nome correto", () => {
    render(<CardIdoso item={mockItem} />);
    const nameElement = screen.getByText("Nome do Idoso");
    expect(nameElement).toBeTruthy();
  });

  it("navega para a edição do Idoso ao pressionar o ícone de lápis", () => {
    render(<CardIdoso item={mockItem} />);
    const pencilIcon = screen.getByTestId("pencil-icon");
    fireEvent.press(pencilIcon);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(require("expo-router").router.push).toHaveBeenCalledWith({
      pathname: "/private/pages/editarIdoso",
      params: {
        id: mockItem.id,
        nome: mockItem.nome,
        foto: expect.any(String),
        dataNascimento: mockItem.dataNascimento,
        idUsuario: mockItem.idUsuario,
        telefoneResponsavel: mockItem.telefoneResponsavel,
        dataHora: mockItem.dataHora,
      },
    });
  });

  it("seleciona o Idoso ao pressionar o componente CardIdoso", () => {
    render(<CardIdoso item={mockItem} />);
    const cardIdosoPressable = screen.getByTestId("cardIdosoPressable");
    fireEvent.press(cardIdosoPressable);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(require("expo-router").router.push).toHaveBeenCalledWith({
      params: {
        dataHora: "2023-01-01T12:00:00",
        dataNascimento: "1990-01-01",
        foto: "data:image/png;base64,base64-encoded-image-data",
        id: 1,
        idUsuario: 123,
        nome: "Nome do Idoso",
        telefoneResponsavel: "123456789",
      },
      pathname: "/private/pages/editarIdoso",
    });
  });
});
