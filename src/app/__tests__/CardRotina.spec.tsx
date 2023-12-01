import React from "react";
import { render } from "@testing-library/react-native";
import CardRotina from "../components/CardRotina";
import { ECategoriaRotina, IRotina } from "../interfaces/rotina.interface";

// Mockando módulos externos
jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve("mockedToken")),
}));

// Mockando funções externas
jest.mock("../services/rotina.service", () => ({
  updateRotina: jest.fn(),
}));

const mockItem: IRotina = {
  id: 1,
  idIdoso: 1,
  titulo: "Exemplo",
  descricao: "Descrição de exemplo",
  categoria: ECategoriaRotina.ALIMENTACAO,
  dias: [0, 1],
  concluido: false,
  dataHora: "2023-01-01T12:00:00",
};

describe("Testes para CardRotina", () => {
  it("deve renderizar corretamente", () => {
    const { getByText } = render(<CardRotina item={mockItem} index={0} />);
    expect(getByText("Exemplo")).toBeTruthy();
    expect(getByText("Descrição de exemplo")).toBeTruthy();
  });
});
