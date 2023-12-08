import { IMetrica, IMetricaValueFilter } from "../interfaces/metricas.interface";
import { IResponse } from "../interfaces/response.interface";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_PORT = process.env.EXPO_PUBLIC_API_SAUDE_PORT;
const BASE_URL = `${API_URL}:${API_PORT}/api/saude/valorMetrica`;

export const getAllMetricaVAlues = async (
    filter: IMetricaValueFilter,
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