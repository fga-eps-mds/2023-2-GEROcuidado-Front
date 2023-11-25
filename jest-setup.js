import "react-native-gesture-handler/jestSetup";

module.exports = {
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^expo-image$": "./__mocks__/expo-image.js",
  },
};

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);
