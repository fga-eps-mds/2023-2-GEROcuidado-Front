import {
  postUser,
  updateUser,
  getUserById,
  deleteUserById,
  loginUser,
} from "../services/user.service";

global.fetch = jest.fn();

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ0ZXNzc3RlQGdtYWlsLmNvbSIsIm5vbWUiOiJQZWRybyIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjk5Mjk4NTY5LCJleHAiOjE2OTkzNDE3Njl9.U7i3VL8fdTH2xmYDrXCxrbp_5EeDXPdf3vAlgvcdNyY";

describe("postUser", () => {
  it("deve fazer uma chamada de API bem-sucedida", async () => {
    // Mock para simular uma resposta de sucesso
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: {
          id: 1, // Defina o ID retornado pelo servidor
          nome: "Nome do Usuário",
          email: "email@example.com",
          senha: "senha",
          admin: true, // Defina o valor apropriado
        },
        message: null,
        status: 201,
      }),
      status: 201,
    });

    const userData = {
      nome: "Nome do Usuário",
      email: "email@example.com",
      senha: "senha",
      admin: true, // Defina o valor apropriado
    };

    const result = await postUser(userData);

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

    const userData = {
      nome: "Nome do Usuário",
      email: "email@example.com",
      senha: "senha",
      admin: true, // Defina o valor apropriado
    };

    try {
      await postUser(userData);
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
          id: 1, // Defina o ID retornado pelo servidor
          nome: "Novo Nome do Usuário", // Novos dados a serem atualizados
          email: "novoemail@example.com", // Novos dados a serem atualizados
          senha: "novasenha", // Novos dados a serem atualizados
          admin: false, // Novos dados a serem atualizados
        },
        message: null,
        status: 200,
      }),
      status: 200,
    });

    const id = 1; // Defina o ID do usuário que deseja atualizar
    const userDataToUpdate = {
      nome: "Novo Nome do Usuário", // Novos dados a serem atualizados
      email: "novoemail@example.com", // Novos dados a serem atualizados
      senha: "novasenha", // Novos dados a serem atualizados
      admin: false, // Novos dados a serem atualizados
    };

    const result = await updateUser(id, userDataToUpdate, token);

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
      nome: "Novo Nome do Usuário", // Novos dados a serem atualizados
      email: "novoemail@example.com", // Novos dados a serem atualizados
      senha: "novasenha", // Novos dados a serem atualizados
      admin: false, // Novos dados a serem atualizados
    };

    try {
      await updateUser(id, userDataToUpdate, token);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Mensagem de erro");
      }
    }
  });
});

describe("getUserById", () => {
  it("deve fazer uma chamada de API bem-sucedida", async () => {
    // Mock para simular uma resposta de sucesso
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: {
          id: 1, // Defina o ID retornado pelo servidor
          nome: "Nome do Usuário",
          email: "email@example.com",
          senha: "senha",
          admin: true, // Defina o valor apropriado
        },
        message: null,
        status: 200,
      }),
      status: 200,
    });

    const id = 1; // Defina o ID do usuário que deseja recuperar

    const result = await getUserById(id, token);

    expect(result.message).toBeNull();
    expect(result.data).toEqual({
      id: 1,
      nome: "Nome do Usuário",
      email: "email@example.com",
      senha: "senha",
      admin: true,
    });
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

    const id = 1; // Defina o ID do usuário que deseja recuperar

    try {
      await getUserById(id, token);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Mensagem de erro");
      }
    }
  });
});

describe("deleteUserById", () => {
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

    const result = await deleteUserById(id, token);

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
      await deleteUserById(id, token);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Mensagem de erro");
      }
    }
  });
});

describe("loginUser", () => {
  it("deve fazer uma chamada de API bem-sucedida", async () => {
    // Mock para simular uma resposta de sucesso
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: "seu_token", // Defina o token retornado pela API após o login bem-sucedido
        message: null,
        status: 200,
      }),
      status: 200,
    });

    const loginData = {
      email: "email@example.com",
      senha: "senha",
    };

    const result = await loginUser(loginData);

    expect(result.message).toBeNull();
    expect(typeof result.data).toBe("string"); // Verifica se o token é uma string
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

    const loginData = {
      email: "email@example.com",
      senha: "senha",
    };

    try {
      await loginUser(loginData);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Mensagem de erro");
      }
    }
  });
});
