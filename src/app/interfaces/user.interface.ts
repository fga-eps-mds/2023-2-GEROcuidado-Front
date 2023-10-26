export interface IUserBody {
  nome: string;
  email: string;
  senha: string;
}

export interface IUser {
  id: number;
  nome: string;
  email: string;
  senha: string;
  foto?: string;
  admin: boolean;
}