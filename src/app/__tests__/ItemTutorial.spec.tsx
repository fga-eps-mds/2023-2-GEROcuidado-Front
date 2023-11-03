import React from "react";
import { render } from "@testing-library/react-native";
import ItemTutorial from "../components/ItemTutorial";
import { Text } from "react-native";

describe("ItemTutorial", () => {
  it("renderiza corretamente", () => {
    const { toJSON } = render(
      <ItemTutorial
        imageSrc={require("../../../assets/img_tutor1.png")}
        textEl={<Text>Teste</Text>}
      />,
    );
    expect(toJSON());
  });
});
