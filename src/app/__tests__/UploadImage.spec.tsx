import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import UploadImage from "../components/UploadImage";
import * as ImagePicker from "expo-image-picker";

describe("UploadImage", () => {
  it("renderiza corretamente sem imagem inicial", () => {
    const { queryByTestId } = render(<UploadImage setFoto={() => {}} />);
    const imagemElement = queryByTestId("upload-image-imagem");
    expect(imagemElement).toBeNull();
  });
  it("deve renderizar corretamente", () => {
    const setFoto = jest.fn();
    const { toJSON } = render(<UploadImage setFoto={setFoto} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
