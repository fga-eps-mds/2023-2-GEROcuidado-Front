# Instala a ultima versao do node no container
FROM node:latest

# Cria o diretorio app/src
RUN mkdir -p /app/src

# Coloca o diretorio app/src como workdir
WORKDIR /app/src

# Copia o package.json do projeto para o workdir
COPY package.json .

# instala o que tem no package.json
RUN npm install

# Copia tudo da pasta atual para o workdir
COPY . .

ARG PORT=19002
ENV PORT $PORT
EXPOSE $PORT 19001 19002

CMD [ "npx", "expo", "start" ]