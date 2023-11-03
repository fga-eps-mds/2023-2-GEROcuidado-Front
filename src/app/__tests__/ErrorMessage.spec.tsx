import React from "react";
import { render } from "@testing-library/react-native";
import ErrorMessage from "../components/ErrorMessage";

describe("ErrorMessage", () => {
  it("renderiza corretamente", () => {
    const { toJSON } = render(<ErrorMessage text="teste" show={true} />);
    expect(toJSON());
  });
});
