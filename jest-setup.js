import 'react-native-gesture-handler/jestSetup';

module.exports = {
  
  moduleNameMapper: {
    '^expo-image$': './__mocks__/expo-image.js',
  },
  // ... other configurations
};

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);
