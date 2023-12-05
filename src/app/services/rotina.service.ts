import {
  IOrder,
  IRotina,
  IRotinaBody,
  IRotinaFilter,
} from "../interfaces/rotina.interface";
import { IResponse } from "../interfaces/response.interface";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_PORT = process.env.EXPO_PUBLIC_API_SAUDE_PORT;
const BASE_URL = `${API_URL}:${API_PORT}/api/saude/rotina`;

export const postRotina = async (
  body: IRotinaBody,
  token: string,
): Promise<IResponse<IRotina | null>> => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const json = await response.json();

  if (response.status !== 201) {
    throw new Error(json.message as string);
  }

  return json;
};

export const getAllRotina = async (
  filter: IRotinaFilter,
  order: IOrder,
): Promise<IResponse<IRotina[] | null>> => {
  const params = `limit=20&offset=0&filter=${JSON.stringify(
    filter,
  )}&order=${JSON.stringify(order)}`;
  const response = await fetch(`${BASE_URL}?${params}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (response.status !== 200) {
    throw new Error(json.message as string);
  }

  return json;
};

export const updateRotina = async (
  id: number,
  body: Partial<IRotina>,
  token: string,
): Promise<IResponse<IRotina | null>> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const json = await response.json();

  if (response.status !== 200) {
    throw new Error(json.message as string);
  }

  return json;
};

export const deleteRotina = async (
  id: number,
  token: string,
): Promise<IResponse<IRotina | null>> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();

  if (response.status !== 200) {
    throw new Error(json.message as string);
  }

  return json;
};
