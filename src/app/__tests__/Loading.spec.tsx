import React from "react";
import { render, screen } from "@testing-library/react-native";
import Loading from "../components/Loading";

describe("Loading", () => {
  it("deve renderizar o componente de carregamento corretamente", () => {
    render(<Loading />);

    // Verifique se o componente ActivityIndicator está presente
    const activityIndicator = screen.getByTestId("loading-indicator");
    expect(activityIndicator).toBeTruthy();

    // Verifique se o componente ActivityIndicator tem o tamanho correto
    expect(activityIndicator.props.size).toBe("large");

    // Verifique se o componente ActivityIndicator tem a cor correta
    expect(activityIndicator.props.color).toBe("#fff");

    // Verifique se o contêiner (View) tem a cor de fundo correta
    const container = screen.getByTestId("loading-container");
    expect(container.props.style.backgroundColor).toBe("#00000098");
  });
});
