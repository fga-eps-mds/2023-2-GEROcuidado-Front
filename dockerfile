FROM node:14

WORKDIR /app

COPY . .

RUN npm install -g expo-cli

RUN npm install expo@^49.0.0
RUN npx expo install react-native-web@~0.19.6 react-dom@18.2.0 @expo/webpack-config@^19.0.0

EXPOSE 19000

EXPOSE 19002

EXPOSE 19006

CMD ["expo", "start"]