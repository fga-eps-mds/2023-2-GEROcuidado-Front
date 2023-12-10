import {
  IMetrica,
  IMetricaValueFilter,
  IOrder,
  IValorMetrica,
  IValorMetricaBody,
} from "../interfaces/metricas.interface";
import { IResponse } from "../interfaces/response.interface";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_PORT = process.env.EXPO_PUBLIC_API_SAUDE_PORT;
const BASE_URL = `${API_URL}:${API_PORT}/api/saude/valorMetrica`;

export const getAllMetricaValues = async (
  filter: IMetricaValueFilter,
  order: IOrder,
): Promise<IResponse<IValorMetrica[] | null>> => {
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

export const postMetricaValue = async (
  body: IValorMetricaBody,
  token: string,
): Promise<IResponse<IValorMetrica | null>> => {
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

export const deleteMetricaValue = async (
  id: number,
  token: string,
): Promise<IResponse<IValorMetrica | null>> => {
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
