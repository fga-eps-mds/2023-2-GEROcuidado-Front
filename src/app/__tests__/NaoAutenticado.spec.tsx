import React from "react";
import { render, screen } from "@testing-library/react-native";
import NaoAutenticado from "../components/NaoAutenticado";

describe("NaoAutenticado", () => {
  it("deve renderizar o componente 'NaoAutenticado' corretamente", () => {
    render(<NaoAutenticado />);

    // Verifique se o texto está presente
    const textElement = screen.getByText(
      "Você precisar efetuar login para acessar essa página!",
    );
    expect(textElement).toBeTruthy();

    // Verifique se o botão 'Efetuar Login' está presente
    const linkButtonElement = screen.getByText("Efetuar Login");
    expect(linkButtonElement).toBeTruthy();
  });
});
