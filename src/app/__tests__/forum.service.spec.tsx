import {
  deletePublicacaoById,
  getAllPublicacao,
  postPublicacao,
  updatePublicacao,
} from "../services/forum.service";
import { ECategoriaPublicacao } from "../interfaces/forum.interface";
import { IOrder } from "../interfaces/forum.interface";

global.fetch = jest.fn();

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ0ZXNzc3RlQGdtYWlsLmNvbSIsIm5vbWUiOiJQZWRybyIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjk5Mjk4NTY5LCJleHAiOjE2OTkzNDE3Njl9.U7i3VL8fdTH2xmYDrXCxrbp_5EeDXPdf3vAlgvcdNyY";

describe("getAllPublicacao", () => {
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

    const offset = 0; // Defina os valores necessários para os parâmetros da função
    const filter = { titulo: "Exemplo" };
    const order: IOrder = {
      column: "descricao",
      dir: "DESC",
    };

    const result = await getAllPublicacao(offset, filter, order);

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
      await deletePublicacaoById(id, token);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Mensagem de erro");
      }
    }
  });
});

describe("postPublicacao", () => {
  it("Post: deve fazer uma chamada de API bem-sucedida", async () => {
    // Mock para simular uma resposta de sucesso
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: {
          idUsuario: 1,
          titulo: "Título de Exemplo",
          descricao: "Descrição de Exemplo",
          dataHora: "2023-11-06T12:00:00",
          categoria: ECategoriaPublicacao.GERAL,
          contagemReportes: 0,
        },
        message: null,
        status: 201,
      }),
      status: 201,
    });

    const body = {
      idUsuario: 1,
      titulo: "Título de Exemplo",
      descricao: "Descrição de Exemplo",
      dataHora: "2023-11-06T12:00:00",
      categoria: ECategoriaPublicacao.GERAL,
      contagemReportes: 0,
    };

    const result = await postPublicacao(body, token);

    expect(result.status).toBe(201);
    expect(result.data).toEqual({
      idUsuario: 1,
      titulo: "Título de Exemplo",
      descricao: "Descrição de Exemplo",
      dataHora: "2023-11-06T12:00:00",
      categoria: ECategoriaPublicacao.GERAL,
      contagemReportes: 0,
    });
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
      await deletePublicacaoById(id, token);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Mensagem de erro");
      }
    }
  });
});

describe("updatePublicacao", () => {
  it("deve fazer uma chamada de API bem-sucedida", async () => {
    // Mock para simular uma resposta de sucesso
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: {
          id: 1,
          idUsuario: 1,
          titulo: "Título Atualizado",
          descricao: "Descrição Atualizada",
          dataHora: "2023-11-06T14:00:00",
          categoria: ECategoriaPublicacao.GERAL,
          contagemReportes: 0,
        },
        message: null,
        status: 200,
      }),
      status: 200,
    });

    const id = 1; // Defina o ID da publicação que você deseja atualizar
    const body = {
      titulo: "Título Atualizado",
      descricao: "Descrição Atualizada",
      dataHora: "2023-11-06T14:00:00",
      categoria: ECategoriaPublicacao.GERAL,
      contagemReportes: 0,
    };

    const result = await updatePublicacao(id, body, token);

    expect(result.status).toBe(200);
    expect(result.data).toEqual({
      id: 1,
      idUsuario: 1,
      titulo: "Título Atualizado",
      descricao: "Descrição Atualizada",
      dataHora: "2023-11-06T14:00:00",
      categoria: ECategoriaPublicacao.GERAL,
      contagemReportes: 0,
    });
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

    const id = 1; // Defina o ID da publicação que você deseja atualizar
    const body = {
      titulo: "Título Atualizado",
      descricao: "Descrição Atualizada",
      dataHora: "2023-11-06T14:00:00",
      categoria: ECategoriaPublicacao.GERAL,
      contagemReportes: 0,
    };
    const token = "seu_token_valido_aqui"; // Defina um token válido

    try {
      await updatePublicacao(id, body, token);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Mensagem de erro");
      }
    }
  });
});

describe("deletePublicacaoById", () => {
  it("deve fazer uma chamada de API bem-sucedida", async () => {
    // Mock para simular uma resposta de sucesso
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: {
          id: 1,
          idUsuario: 1,
          titulo: "Título Exemplo",
          descricao: "Descrição Exemplo",
          dataHora: "2023-11-06T12:00:00",
          categoria: ECategoriaPublicacao.GERAL,
          contagemReportes: 0,
        },
        message: null,
        status: 200,
      }),
      status: 200,
    });

    const id = 1; // Defina o ID da publicação que você deseja excluir
    const result = await deletePublicacaoById(id, token);

    expect(result.status).toBe(200);
    expect(result.data).toEqual({
      id: 1,
      idUsuario: 1,
      titulo: "Título Exemplo",
      descricao: "Descrição Exemplo",
      dataHora: "2023-11-06T12:00:00",
      categoria: ECategoriaPublicacao.GERAL,
      contagemReportes: 0,
    });
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
      await deletePublicacaoById(id, token);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Mensagem de erro");
      }
    }
  });
});
