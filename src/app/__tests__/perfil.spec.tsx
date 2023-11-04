import React from "react";
import { render } from "@testing-library/react-native";
import Perfil from "../private/tabs/perfil";

describe("Perfil", () => {
  it("renderiza corretamente", () => {
    const { toJSON } = render(<Perfil />);
    expect(toJSON());
  });
});
