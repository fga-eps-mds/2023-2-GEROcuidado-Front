# GEROcuidado Mobile App

## Badges
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2023-2-GEROcuidado-Front&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2023-2-GEROcuidado-Front)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2023-2-GEROcuidado-Front&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2023-2-GEROcuidado-Front)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2023-2-GEROcuidado-Front&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2023-2-GEROcuidado-Front)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2023-2-GEROcuidado-Front&metric=bugs)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2023-2-GEROcuidado-Front)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2023-2-GEROcuidado-Front&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2023-2-GEROcuidado-Front)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2023-2-GEROcuidado-Front&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2023-2-GEROcuidado-Front)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2023-2-GEROcuidado-Front&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2023-2-GEROcuidado-Front)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2023-2-GEROcuidado-Front&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2023-2-GEROcuidado-Front)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2023-2-GEROcuidado-Front&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2023-2-GEROcuidado-Front)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2023-2-GEROcuidado-Front&metric=coverage)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2023-2-GEROcuidado-Front)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2023-2-GEROcuidado-Front&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2023-2-GEROcuidado-Front)


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

### OBSERVAÇÕES IMPORTANTES

1. Para testar a aplicação no celular, basta subir o container com os passos acima, ter baixado no seu dispositivo o aplicativo EXPO GO e por fim acessar o link exp://192.168.0.9:8081 no seu navegador. (A aplicação não aparecerá automaticamente no aplicativo do EXPO GO, é necessário acessar o link)

2. Para testar a aplicação no celular em ambiente de desenvolvimento, é necessário também remover essa configuração do app.json:

```json
"eas": {
  "projectId": "xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx"
}
```

## Testes Unitários

Para rodar os testes unitários, basta executar o comando:
```bash
docker compose -f docker-compose.test.yml up
```

## QR Code para testes
### IOS
![IOS](https://github.com/fga-eps-mds/2023-2-GEROcuidado-Front/assets/51385738/1a9562d5-dec5-485d-999a-59f2f16e2427)
### Android
![Android](https://github.com/fga-eps-mds/2023-2-GEROcuidado-Front/assets/51385738/9a6d23c0-2f88-42de-ac26-719e6faa9fd3)
### 📝 Notes

- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)
