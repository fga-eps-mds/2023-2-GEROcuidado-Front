import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BarraPesquisa from "../components/BarraPesquisa";

describe("BarraPesquisa", () => {
  it("deve renderizar corretamente", () => {
    const { getByPlaceholderText } = render(
      <BarraPesquisa callbackFn={() => {}} />,
    );
    const inputElement = getByPlaceholderText("Pesquise uma publicação");
    expect(inputElement).toBeTruthy();
  });

  it("deve chamar a função de retorno (callbackFn) com o valor do campo de pesquisa", () => {
    const callbackFn = jest.fn();
    const { getByPlaceholderText, getByDisplayValue } = render(
      <BarraPesquisa callbackFn={callbackFn} />,
    );
    const inputElement = getByPlaceholderText("Pesquise uma publicação");

    // Simula a digitação de texto no campo de pesquisa
    fireEvent.changeText(inputElement, "Texto de pesquisa");

    // Verifica se o valor do campo de pesquisa foi atualizado corretamente
    expect(getByDisplayValue("Texto de pesquisa")).toBeTruthy();

    // Verifica se a função de retorno (callbackFn) foi chamada com o valor correto
    expect(callbackFn).toHaveBeenCalledWith("Texto de pesquisa");
  });
});
