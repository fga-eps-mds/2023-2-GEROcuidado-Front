import React from "react";
import { render } from "@testing-library/react-native";
import Home from "..";

describe("Home", () => {
  it("renderiza corretamente", () => {
    const { toJSON } = render(<Home />);
    expect(toJSON()).toMatchSnapshot();
  });
  it("deve conter um título", () => {
    const { getByText } = render(<Home />);
    const titleElement = getByText("Seja um GEROcuidador!");
    expect(titleElement).toBeTruthy();
  });

  it("deve conter botões de ação", () => {
    const { getByText } = render(<Home />);
    const forumButton = getByText("Acessar Fórum");
    const loginButton = getByText("Login");
    const cadastroButton = getByText("Cadastre-se");
    expect(forumButton).toBeTruthy();
    expect(loginButton).toBeTruthy();
    expect(cadastroButton).toBeTruthy();
  });
});
