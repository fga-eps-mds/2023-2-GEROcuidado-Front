import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LinkButton from "../components/LinkButton";

// Importe o módulo do router (ou arquivo real) que contém a função 'push'
import { router } from "expo-router";

describe("LinkButton", () => {
  it("deve renderizar corretamente", () => {
    const { getByText, getByTestId } = render(
      <LinkButton title="Teste" href="/test" />,
    );

    // Verifica se o componente foi renderizado corretamente
    const button = getByTestId("link-button");
    const buttonText = getByText("Teste");

    expect(button).toBeDefined();
    expect(buttonText).toBeDefined();
  });

  it("deve usar a cor de fundo personalizada", () => {
    const backgroundColor = "red";
    const { getByTestId } = render(
      <LinkButton
        title="Teste"
        href="/test"
        backgroundColor={backgroundColor}
      />,
    );

    const button = getByTestId("link-button");

    // Verifica se o estilo de fundo personalizado foi aplicado corretamente
    const style = button.props.style;
    expect(style).toEqual(expect.objectContaining({ backgroundColor }));
  });

  it("deve chamar a função de navegação corretamente", () => {
    const href = "/test";
    const pushMock = jest.fn();
    // Substitua 'router.push' pela função de mock
    router.push = pushMock;

    const { getByTestId } = render(<LinkButton title="Teste" href={href} />);

    const button = getByTestId("link-button");
    fireEvent.press(button);

    expect(pushMock).toHaveBeenCalledWith(href);
  });
});
