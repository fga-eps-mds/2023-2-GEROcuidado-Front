import "@react-native-async-storage/async-storage/jest/async-storage-mock";

import { fireEvent, render, waitFor } from "@testing-library/react-native";

import Login from "../public/login";
import React from "react";
import { router } from "expo-router";
// import JWT from "expo-jwt";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock("expo-jwt", () => ({
  decode: () => ({ id: 1 }),
}));

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const userService = require("../services/user.service");
jest.mock("../services/user.service");

describe("Login Component", () => {
  it("renderiza corretamente", async () => {
    await waitFor(() => render(<Login />));
  });

});
