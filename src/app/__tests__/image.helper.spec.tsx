import { getImageUri } from "../shared/helpers/image.helper";

// Descreva o teste
describe("getImageUri", () => {
  it("deve retornar uma URI de imagem válida para um Buffer fornecido", () => {
    // Crie um Buffer de teste (pode ser uma imagem simulada)
    const buffer = Buffer.from("conteudo-do-buffer");

    // Chame a função que você deseja testar
    const result = getImageUri(buffer);

    // Avalie o resultado esperado
    expect(result).toMatch(/^data:image\/png;base64,/);
  });
});
