import { IPublicacao, IPublicacaoBody } from "../interfaces/forum.interface";
import { IResponse } from "../interfaces/response.interface";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_PORT = process.env.EXPO_PUBLIC_API_FORUM_PORT;
const BASE_URL = `${API_URL}:${API_PORT}/api/forum`;

export const postPublicacao = async (
  body: IPublicacaoBody,
): Promise<IResponse<IPublicacao | null>> => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await response.json();

  if (response.status !== 201) {
    throw new Error(json.message as string);
  }

  return json;
};

