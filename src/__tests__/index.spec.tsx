import { render } from "@testing-library/react-native";
import Home from "../app/index";

describe("<Home/>", () => {
  it("should be defined", () => {
    const component = render(<Home />);
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });
});
