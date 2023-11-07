# GEROcuidado Mobile App

## Como rodar o projeto

1. Clonar o repositório:
```bash
git clone https://github.com/fga-eps-mds/2023-2-GEROcuidado-Front.git
```

2. Ir para a pasta do projeto:
```bash
cd 2023-2-GEROcuidado-Front/
```

3. Rodar o container:
- em ambiente de dev:
```bash
docker compose up
```

- em ambiente de prod:
```bash
NODE_ENV=production docker compose up
```

### OBSERVAÇÃO IMPORTANTE

Para testar a aplicação no celular, basta subir o container com os passos acima, ter baixado no seu dispositivo o aplicativo EXPO GO e por fim acessar o link exp://192.168.0.9:8081 no seu navegador. (A aplicação não aparecerá automaticamente no aplicativo do EXPO GO, é necessário acessar o link)

## Testes Unitários

Para rodar os testes unitários, basta executar o comando:
```bash
docker compose -f docker-compose.test.yml up
```

## QR Code para testes
### IOS
![IOS](assets/testes/ios_27-10.png.jpeg)
### Android
![Android](assets/testes/Android_27-10.png)
### 📝 Notes

- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)
