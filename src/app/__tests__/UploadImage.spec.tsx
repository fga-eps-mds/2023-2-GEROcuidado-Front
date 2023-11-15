import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import UploadImage from "../components/UploadImage";

// Mock do ImagePicker
jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn().mockResolvedValue({
    cancelled: false,
    assets: [{ uri: "mocked-image-uri", base64: "mocked-base64-data" }],
  }),
  MediaTypeOptions: {
    All: "All",
  },
}));

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

  it("escolher imagem e chamar setFoto corretamente", async () => {
    const setFotoMock = jest.fn();
    const { getByTestId } = render(<UploadImage setFoto={setFotoMock} />);

    const pickImageButton = getByTestId("upload-image-botao");

    // Simule o clique no botão para acionar a função pickImage
    fireEvent.press(pickImageButton);

    // Aguarde a resolução da promessa após a seleção da imagem
    await waitFor(() => {
      expect(setFotoMock).toHaveBeenCalled();
      expect(setFotoMock).toHaveBeenCalledWith("mocked-base64-data");
    });
  });
});
