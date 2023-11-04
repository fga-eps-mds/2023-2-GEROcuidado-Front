import React from "react";
import renderer from "react-test-renderer";
import PublicLayout from "../public/_layout"; // Substitua o caminho pelo local correto do seu componente
import PrivateLayout from "../private/pages/_layout";
import TabsLayout from "../private/tabs/_layout";

describe("PublicLayout", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<PublicLayout />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
describe("PrivateLayout", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<PrivateLayout />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
describe("TabsLayout", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<TabsLayout />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("changes tab on press", () => {
    const component = renderer.create(<TabsLayout />);
    const instance = component.root;
    const tabs = instance.findAllByProps({ testID: "tab" });

    // Simule o pressionamento da segunda aba
    tabs[1].props.onPress();

    // Verifique se a segunda aba está ativa (o ícone deve ser "heart" em vez de "heart-outline")
    const activeTabIconName = tabs[1].props.children.props.name;
    expect(activeTabIconName).toBe("heart");
  });

  it("applies styles correctly", () => {
    const tree = renderer.create(<TabsLayout />).toJSON();

    // Verifique as propriedades de estilo do componente ou elementos internos conforme necessário
    expect(tree).toHaveProperty("props.style.zIndex", 9999);
    expect(tree).toHaveProperty("props.style.backgroundColor", "#2CCDB5");
    expect(tree).toHaveProperty("props.style.height", 70);
    // Verifique outras propriedades de estilo conforme necessário
  });
});
