FROM node:18.17.0-alpine

RUN apk update && apk add curl bash make && rm -rf /var/cache/apk/*

WORKDIR /app

RUN npm i -g --unsafe-perm --allow-root -g expo-cli@6.3.10 @expo/ngrok@4.1.0

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN chmod +x /app/.docker/entrypoint.sh

USER node

EXPOSE 8081
ENTRYPOINT ["/app/.docker/entrypoint.sh"]
