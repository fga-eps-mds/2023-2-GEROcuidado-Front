import { IResponse } from "../interfaces/response.interface";

// Teste para verificar se a interface IResponse está definida corretamente
describe("IResponse Interface", () => {
  it("deve ser uma interface com as propriedades data e message", () => {
    // Verifica se a interface IResponse tem as propriedades data e message
    const response: IResponse<number> = {
      data: 42,
      message: "Sucesso",
    };

    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    expect(response.message).toBeDefined();
  });
});
