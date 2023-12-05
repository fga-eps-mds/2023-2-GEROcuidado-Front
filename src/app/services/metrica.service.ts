import { IMetrica, IMetricaBody } from "../interfaces/metricas.interface";
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