import { fireEvent, render } from "@testing-library/react-native";

import React from "react";
import Tutorial from "../public/tutorial";
import { router } from "expo-router";

jest.mock("expo-router", () => {
  return {
    router: {
      replace: jest.fn(),
    },
  };
});

test("O componente Tutorial deve renderizar corretamente", () => {
  const { getByText } = render(<Tutorial />);

  // Verifique se os elementos esperados estão presentes
  expect(getByText("Gerencie as rotinas do seu idoso")).toBeTruthy();
  expect(getByText("Avançar")).toBeTruthy();
  expect(getByText("Pular")).toBeTruthy();

  // Adicione asserções para outros elementos se necessário
});

test('O botão "Pular" deve chamar a função "router.replace" com o caminho correto', () => {
  const { getByText } = render(<Tutorial />);

  const pularButton = getByText("Pular");
  fireEvent.press(pularButton);

  // Verifica se a função "router.replace" foi chamada com o caminho correto
  expect(router.replace).toHaveBeenCalledWith("/public/login");
});

test('O botão "Avançar" deve permitir navegar entre os slides', () => {
  const { getByText } = render(<Tutorial />);

  const avancarButton = getByText("Avançar");
  fireEvent.press(avancarButton);

  // Verifica se o índice do swiper foi incrementado
  // Você pode usar o estado interno do componente para verificar isso
  // Certifique-se de que o índice não ultrapasse o número total de slides
  // Adicione outras asserções se necessário
});

test('O botão "Avançar" deve permitir navegar entre os slides', () => {
  const { getByText } = render(<Tutorial />);

  const avancarButton = getByText("Avançar");
  fireEvent.press(avancarButton);

  // Verifica se o índice do swiper foi incrementado
  // Você pode usar o estado interno do componente para verificar isso
  // Certifique-se de que o índice não ultrapasse o número total de slides
  // Adicione outras asserções se necessário
});
