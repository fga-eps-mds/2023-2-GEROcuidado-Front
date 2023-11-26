import {
  postRotina,
  getAllRotina,
  updateRotina,
  deleteRotina,
} from "../services/rotina.service";

import { ECategoriaRotina } from "../interfaces/rotina.interface";

global.fetch = jest.fn();

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ0ZXNzc3RlQGdtYWlsLmNvbSIsIm5vbWUiOiJQZWRybyIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjk5Mjk4NTY5LCJleHAiOjE2OTkzNDE3Njl9.U7i3VL8fdTH2xmYDrXCxrbp_5EeDXPdf3vAlgvcdNyY";

describe("postRotina", () => {
  it("deve fazer uma chamada de API bem-sucedida", async () => {
    // Mock para simular uma resposta de sucesso
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: {
          titulo: "Titulo",
          idIdoso: 1,
          categoria: ECategoriaRotina.GERAL,
          descricao: "Descrição",
          concluido: false,
          dataHora: "2023-11-06T12:00:00",
          dias: [0, 1],
        },
        message: null,
        status: 201,
      }),
      status: 201,
    });

    const body = {
      titulo: "Titulo",
      idIdoso: 1,
      categoria: ECategoriaRotina.GERAL,
      descricao: "Descrição",
      concluido: false,
      dataHora: "2023-11-06T12:00:00",
      dias: [0, 1],
    };

    const result = await postRotina(body, token);

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
      titulo: "Titulo",
      idIdoso: 1,
      categoria: ECategoriaRotina.GERAL,
      descricao: "Descrição",
      concluido: false,
      dataHora: "2023-11-06T12:00:00",
      dias: [0, 1],
    };

    try {
      await postRotina(body, token);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Mensagem de erro");
      }
    }
  });
});

describe("updateRotina", () => {
  it("deve fazer uma chamada de API bem-sucedida", async () => {
    // Mock para simular uma resposta de sucesso
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: {
          titulo: "Titulo",
          idIdoso: 1,
          categoria: ECategoriaRotina.GERAL,
          descricao: "Descrição",
          concluido: false,
          dataHora: "2023-11-06T12:00:00",
          dias: [0, 1],
        },
        message: null,
        status: 200,
      }),
      status: 200,
    });

    const id = 1; // Defina o ID do usuário que deseja atualizar
    const userDataToUpdate = {
      titulo: "Titulo",
      idIdoso: 1,
      categoria: ECategoriaRotina.ALIMENTACAO,
      descricao: "Descrição Update",
      concluido: false,
      dataHora: "2023-11-06T12:00:00",
      dias: [0, 1],
    };

    const result = await updateRotina(id, userDataToUpdate, token);

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
      titulo: "Titulo",
      idIdoso: 1,
      categoria: ECategoriaRotina.ALIMENTACAO,
      descricao: "Descrição Update",
      concluido: false,
      dataHora: "2023-11-06T12:00:00",
      dias: [0, 1],
    };

    try {
      await updateRotina(id, userDataToUpdate, token);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Mensagem de erro");
      }
    }
  });
});

describe("getAllRotina", () => {
  it("Get: deve fazer uma chamada de API bem-sucedida", async () => {
    // Mock para simular uma resposta de sucesso
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: null,
        message: null,
        status: 200,
      }),
      status: 200,
    });

    const result = await getAllRotina();

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
      await deleteRotina(id, token);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Mensagem de erro");
      }
    }
  });
});

describe("deleteRotina", () => {
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

    const result = await deleteRotina(id, token);

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
      await deleteRotina(id, token);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Mensagem de erro");
      }
    }
  });
});
