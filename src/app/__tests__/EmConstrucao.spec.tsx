import React from "react";
import { render, screen } from "@testing-library/react-native";
import EmConstrucao from "../components/EmConstrucao";
import "@testing-library/jest-native/extend-expect";

describe("EmConstrucao", () => {
  it("deve aplicar os estilos corretamente", () => {
    render(<EmConstrucao />);

    // Verifique se o contêiner (view) tem a classe de estilo correta
    const containerElement = screen.getByTestId("em-construcao-container");
    expect(containerElement).toHaveStyle({
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      width: "100%",
      marginTop: "75%",
      marginLeft: "auto",
      marginRight: "auto",
    });

    // Verifique se o texto tem o estilo correto
    const textElement = screen.getByText("Página em construção!");
    expect(textElement).toHaveStyle({
      textAlign: "center",
      fontSize: 20,
      fontWeight: "500",
      marginVertical: 10,
      marginHorizontal: 10,
    });
  });
});
