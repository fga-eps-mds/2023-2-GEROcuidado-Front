import { IResponse } from "../interfaces/response.interface";
import { IUser, IUserBody, IUserLogin } from "../interfaces/user.interface";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_PORT = process.env.EXPO_PUBLIC_API_USUARIO_PORT;
const BASE_URL = `${API_URL}:${API_PORT}/api/usuario`

export const postUser = async (body: IUserBody): Promise<IResponse<IUser | null>> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const json = await response.json();

  if (response.status !== 201) {
    throw new Error(json.message as string)
  }

  return json;
}

export const loginUser = async (body: IUserLogin): Promise<IResponse<string>> => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const json = await response.json();

  if (response.status !== 200) {
    throw new Error(json.message as string)
  }

  return json;
}