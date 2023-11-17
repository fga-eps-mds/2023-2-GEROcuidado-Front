import { ETipoSanguineo, IOrder } from "../interfaces/idoso.interface";
import {
  postIdoso,
  getAllIdoso,
  updateIdoso,
  deleteIdoso,
} from "../services/idoso.service";

global.fetch = jest.fn();

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ0ZXNzc3RlQGdtYWlsLmNvbSIsIm5vbWUiOiJQZWRybyIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjk5Mjk4NTY5LCJleHAiOjE2OTkzNDE3Njl9.U7i3VL8fdTH2xmYDrXCxrbp_5EeDXPdf3vAlgvcdNyY";

describe("postIdoso", () => {
  it("deve fazer uma chamada de API bem-sucedida", async () => {
    // Mock para simular uma resposta de sucesso
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: {
          nome: "Teste",
          dataNascimento: "21/21/2023",
          idUsuario: 1,
          foto: "",
          tipoSanguineo: ETipoSanguineo.A_POSITIVO,
          telefoneResponsavel: "11111111111",
          descricao: "Descrição de Exemplo",
          dataHora: "2023-11-06T12:00:00",
        },
        message: null,
        status: 201,
      }),
      status: 201,
    });

    const body = {
      nome: "Teste",
      dataNascimento: "21/21/2023",
      idUsuario: 1,
      foto: "",
      tipoSanguineo: ETipoSanguineo.A_POSITIVO,
      telefoneResponsavel: "11111111111",
      descricao: "Descrição de Exemplo",
      dataHora: "2023-11-06T12:00:00",
    };

    const result = await postIdoso(body, token);

    expect(result.message).toBeNull();
  });

  it("deve lidar com uma chamada de API com erro", async () => {
    // Mock para simular uma resposta de erro
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: null,
        message: "Mensagem de erro",
        status: 400,
      }),
      status: 400,
    });

    const body = {
      nome: "Teste",
      dataNascimento: "21/21/2023",
      idUsuario: 1,
      foto: "",
      tipoSanguineo: ETipoSanguineo.A_POSITIVO,
      telefoneResponsavel: "11111111111",
      descricao: "Descrição de Exemplo",
      dataHora: "2023-11-06T12:00:00",
    };

    try {
      await postIdoso(body, token);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Mensagem de erro");
      }
    }
  });
});

describe("updateUser", () => {
  it("deve fazer uma chamada de API bem-sucedida", async () => {
    // Mock para simular uma resposta de sucesso
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: {
          nome: "Teste",
          dataNascimento: "21/21/2023",
          idUsuario: 1,
          foto: "",
          tipoSanguineo: ETipoSanguineo.A_POSITIVO,
          telefoneResponsavel: "11111111111",
          descricao: "Descrição de Exemplo",
          dataHora: "2023-11-06T12:00:00",
        },
        message: null,
        status: 200,
      }),
      status: 200,
    });

    const id = 1; // Defina o ID do usuário que deseja atualizar
    const userDataToUpdate = {
      nome: "Teste",
      dataNascimento: "21/21/2023",
      idUsuario: 1,
      foto: "",
      tipoSanguineo: ETipoSanguineo.A_POSITIVO,
      telefoneResponsavel: "11111111111",
      descricao: "Descrição de Exemplo",
      dataHora: "2023-11-06T12:00:00",
    };

    const result = await updateIdoso(id, userDataToUpdate, token);

    expect(result.message).toBeNull();
  });

  it("deve lidar com uma chamada de API com erro", async () => {
    // Mock para simular uma resposta de erro
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: null,
        message: "Mensagem de erro",
        status: 400,
      }),
      status: 400,
    });

    const id = 1; // Defina o ID do usuário que deseja atualizar
    const userDataToUpdate = {
      nome: "Teste",
      dataNascimento: "21/21/2023",
      idUsuario: 1,
      foto: "",
      tipoSanguineo: ETipoSanguineo.A_POSITIVO,
      telefoneResponsavel: "11111111111",
      descricao: "Descrição de Exemplo",
      dataHora: "2023-11-06T12:00:00",
    };

    try {
      await updateIdoso(id, userDataToUpdate, token);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Mensagem de erro");
      }
    }
  });
});

describe("getAllIdoso", () => {
  it("Get: deve fazer uma chamada de API bem-sucedida", async () => {
    // Mock para simular uma resposta de sucesso
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: [
          /* seus dados de publicação aqui */
        ],
        message: null,
        status: 200,
      }),
      status: 200,
    });

    const order: IOrder = {
      column: "descricao",
      dir: "DESC",
    };

    const result = await getAllIdoso(order);

    expect(result.message).toBeNull();
  });
  it("deve lidar com uma chamada de API com erro", async () => {
    // Mock para simular uma resposta de erro
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: null,
        message: "Mensagem de erro",
        status: 400,
      }),
      status: 400,
    });

    const id = 1; // Defina o ID da publicação que você deseja excluir

    try {
      await deleteIdoso(id, token);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Mensagem de erro");
      }
    }
  });
});

describe("deleteIdoso", () => {
  it("deve fazer uma chamada de API bem-sucedida", async () => {
    // Mock para simular uma resposta de sucesso
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: null, // Defina os dados retornados, que devem ser nulos após a exclusão bem-sucedida
        message: null,
        status: 200,
      }),
      status: 200,
    });

    const id = 1; // Defina o ID do usuário que deseja excluir

    const result = await deleteIdoso(id, token);

    expect(result.message).toBeNull();
    expect(result.data).toBeNull(); // Verifica se os dados retornados são nulos após a exclusão bem-sucedida
  });

  it("deve lidar com uma chamada de API com erro", async () => {
    // Mock para simular uma resposta de erro
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: null,
        message: "Mensagem de erro",
        status: 400,
      }),
      status: 400,
    });

    const id = 1; // Defina o ID do usuário que deseja excluir

    try {
      await deleteIdoso(id, token);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Mensagem de erro");
      }
    }
  });
});
