import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import UploadImageV2 from "../components/UploadImageV2";

// Importe isto para garantir que o mock seja definido antes de importar o componente
jest.mock("expo-image-picker");
import * as ImagePicker from "expo-image-picker";

const launchImageLibraryAsyncMock = jest.fn().mockResolvedValueOnce({
  assets: [
    {
      uri: "fakeImageUri",
      base64: "fakeBase64",
    },
  ],
});

ImagePicker.launchImageLibraryAsync = launchImageLibraryAsyncMock;

describe("UploadImageV2", () => {
  it("deve renderizar corretamente e chamar a função de callback ao selecionar uma imagem", async () => {
    const setPhotoCallbackMock = jest.fn();
    const { getByTestId } = render(
      <UploadImageV2
        setPhotoCallback={setPhotoCallbackMock}
        base64="fakeBase64"
      />,
    );

    fireEvent.press(getByTestId("uploadImageButton"));

    await Promise.resolve();

    expect(setPhotoCallbackMock).toHaveBeenCalledWith("fakeBase64");
  });
});
