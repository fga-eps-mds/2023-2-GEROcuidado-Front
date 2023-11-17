import React from "react";
import { render, screen } from "@testing-library/react-native";
import CardIdoso from "../components/CardIdoso";

const mockItem = {
  id: 1,
  nome: "Nome do Idoso",
  foto: "data:image/png;base64,base64-encoded-image-data",
};

describe("CardIdoso", () => {
  it("renderiza o componente CardIdoso com o nome correto", () => {
    render(<CardIdoso item={mockItem} />);
    const nameElement = screen.getByText("Nome do Idoso");
    expect(nameElement).toBeTruthy();
  });
});
