FROM node:18.17.0-alpine as BUILD_NODE_MODULES

RUN apk update && apk add curl bash make && rm -rf /var/cache/apk/*

WORKDIR /home/node/app

RUN npm i -g --unsafe-perm --allow-root -g expo-cli@6.3.10

COPY package*.json ./

RUN npm ci --legacy-peer-deps


FROM node:18.17.0-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --chown=node:node ./ /app
COPY --chown=node:node --from=BUILD_NODE_MODULES /home/node/app/node_modules /app/node_modules

USER node

EXPOSE 8081

ENTRYPOINT ["npm"]
CMD ["start"]
