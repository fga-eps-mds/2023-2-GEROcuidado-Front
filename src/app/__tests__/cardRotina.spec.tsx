import React from "react";
import { act, render } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "@react-native-async-storage/async-storage/jest/async-storage-mock";
import CardRotina from "../components/CardRotina";
import { ECategoriaRotina, EDiasSemana } from "../interfaces/rotina.interface";

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

const rotina = {
  id: 1,
  titulo: "Título de Exemplo",
  idIdoso: 123,
  categoria: ECategoriaRotina.ALIMENTACAO,
  descricao: "Descrição de Exemplo",
  dataHoraConcluidos: [],
  dataHora: new Date(),
  dias: [EDiasSemana.Domingo],
};

const rotina_exercicios = {
  id: 2,
  titulo: "Card exercicio",
  idIdoso: 456,
  categoria: ECategoriaRotina.EXERCICIOS,
  descricao: "caminhada",
  dataHoraConcluidos: [],
  dataHora: new Date(),
  dias: [EDiasSemana.Domingo],
};

const rotina_medicamentos = {
  id: 3,
  titulo: "Card medicamento",
  idIdoso: 789,
  categoria: ECategoriaRotina.MEDICAMENTO,
  descricao: "dipirona",
  dataHoraConcluidos: [],
  dataHora: new Date(),
  dias: [EDiasSemana.Domingo],
};

describe("Teste Componente Card Rotina", () => {
  act(() => {
    test("Renderiza corretamente", () => {
      const { getByText } = render(
        <CardRotina item={rotina} index={0} date={new Date()} />,
      );
      expect(getByText("Título de Exemplo")).toBeTruthy();
      expect(getByText("Descrição de Exemplo")).toBeTruthy();
    });
    test("Renderiza corretamente Card de exercicios", () => {
      const { getByText } = render(
        <CardRotina item={rotina_exercicios} index={0} date={new Date()} />,
      );
      expect(getByText("Card exercicio")).toBeTruthy();
      expect(getByText("caminhada")).toBeTruthy();
    });
    test("Renderiza corretamente Card de Medicamentos", () => {
      const { getByText } = render(
        <CardRotina item={rotina_medicamentos} index={0} date={new Date()} />,
      );
      expect(getByText("Card medicamento")).toBeTruthy();
      expect(getByText("dipirona")).toBeTruthy();
    });
  });
});
