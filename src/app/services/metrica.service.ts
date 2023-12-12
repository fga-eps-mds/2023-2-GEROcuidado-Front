import {
  IMetrica,
  IMetricaBody,
  IMetricaFilter,
} from "../interfaces/metricas.interface";
import { IResponse } from "../interfaces/response.interface";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_PORT = process.env.EXPO_PUBLIC_API_SAUDE_PORT;
const BASE_URL = `${API_URL}:${API_PORT}/api/saude/metrica`;

export const postMetrica = async (
  body: IMetricaBody,
  token: string,
): Promise<IResponse<IMetrica | null>> => {
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

export const getAllMetrica = async (
  filter: IMetricaFilter,
): Promise<IResponse<IMetrica[] | null>> => {
  const params = `limit=20&offset=0&filter=${JSON.stringify(filter)}`;
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

export const updateMetrica = async (
  id: number,
  body: Partial<IMetricaBody>,
  token: string,
): Promise<IResponse<IMetricaBody | null>> => {
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

export const getSomaHidratacao = async (
  id: number,
  token: string,
): Promise<number> => {
  const response = await fetch(`${BASE_URL}/soma-hidratacao/${id}`, {
    method: "GET",
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

  return json.data;
};
