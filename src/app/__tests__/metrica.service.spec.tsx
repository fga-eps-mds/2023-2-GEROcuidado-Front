declare global {
    namespace NodeJS {
      interface Global {
        fetch: jest.Mock;
      }
    }
  }
  
  import { postMetrica, getAllMetrica } from '../services/metrica.service';
  
  global.fetch = jest.fn();
  
  describe('metricas.service', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
  
    describe('postMetrica', () => {
      it('deve chamar a API corretamente ao criar uma métrica', async () => {
        const mockBody = { /* Seu corpo de exemplo aqui */ };
        const mockToken = 'seu-token-de-exemplo';
  
        const mockResponse = {
          status: 201,
          json: jest.fn().mockResolvedValue({ /* Seu objeto de resposta aqui */ }),
        };
  
        global.fetch.mockResolvedValue(mockResponse);
  
        await postMetrica(mockBody, mockToken);
  
        expect(global.fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${mockToken}`,
            },
            body: JSON.stringify(mockBody),
          }),
        );
      });
  
      it('deve lançar um erro se a resposta da API não for bem-sucedida', async () => {
        const mockBody = {};
        const mockToken = 'seu-token-de-exemplo';
  
        const mockResponse = {
          status: 500,
          json: jest.fn().mockResolvedValue({ message: 'Erro na API' }),
        };
  
        global.fetch.mockResolvedValue(mockResponse);
  
        await expect(postMetrica(mockBody, mockToken)).rejects.toThrow('Erro na API');
      });
    });
  
    describe('getAllMetrica', () => {
      it('deve chamar a API corretamente ao obter todas as métricas', async () => {
        const mockFilter = {};
  
        const mockResponse = {
          status: 200,
          json: jest.fn().mockResolvedValue({}),
        };
  
        global.fetch.mockResolvedValue(mockResponse);
  
        await getAllMetrica(mockFilter);
  
        const expectedParams = `limit=20&offset=0&filter=${JSON.stringify(mockFilter)}`;
  
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining(expectedParams),
          expect.objectContaining({
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }),
        );
      });
  
      it('deve lançar um erro se a resposta da API não for bem-sucedida', async () => {
        const mockFilter = {};
  
        const mockResponse = {
          status: 500,
          json: jest.fn().mockResolvedValue({ message: 'Erro na API' }),
        };
  
        global.fetch.mockResolvedValue(mockResponse);
  
        await expect(getAllMetrica(mockFilter)).rejects.toThrow('Erro na API');
      });
    });
  });
  