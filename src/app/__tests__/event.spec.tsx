import React from "react";
import { render } from "@testing-library/react-native";
import Event from "../private/pages/event";

describe("Event component", () => {
  const eventProps = {
    title: "Sample Event",
    time: "12:00 PM",
  };

  it("renders correctly with given props", () => {
    const { getByText } = render(<Event {...eventProps} />);

    const titleElement = getByText(eventProps.title);
    const timeElement = getByText(eventProps.time);

    expect(titleElement).toBeTruthy();
    expect(timeElement).toBeTruthy();
  });
});
