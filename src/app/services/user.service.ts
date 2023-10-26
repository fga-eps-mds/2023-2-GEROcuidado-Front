import { IResponse } from "../interfaces/response.interface";
import { IUser, IUserBody, IUserLogin } from "../interfaces/user.interface";

const baseUrl = 'http://localhost:3001/api/usuario'

export default class UserService {
  async postUser(body: IUserBody): Promise<IResponse<IUser | null>>{
    const response = await fetch(baseUrl, {
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

  async loginUser(body: IUserLogin): Promise<IResponse<string>>{
    const response = await fetch(`${baseUrl}/login`, {
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
}