import {
  IOrder,
  IPublicacao,
  IPublicacaoBody,
  IPublicacaoFilter,
} from "../interfaces/forum.interface";
import { IResponse } from "../interfaces/response.interface";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_PORT = process.env.EXPO_PUBLIC_API_FORUM_PORT;
const BASE_URL = `${API_URL}:${API_PORT}/api/forum`;

export const postPublicacao = async (
  body: IPublicacaoBody,
  token: string,
): Promise<IResponse<IPublicacao | null>> => {
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

export const getAllPublicacao = async (
  offset: number,
  filter: IPublicacaoFilter,
  order: IOrder,
): Promise<IResponse<IPublicacao[] | null>> => {
  const params = `limit=10&offset=${offset}&filter=${JSON.stringify(
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

export const updatePublicacao = async (
  id: number,
  body: Partial<IPublicacao>,
  token: string,
): Promise<IResponse<IPublicacao | null>> => {
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

export const deletePublicacaoById = async (
  id: number,
  token: string,
): Promise<IResponse<IPublicacao | null>> => {
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
