import { IUser } from "./user.interface";

export enum ECategoriaPublicacao {
  SAUDE = "Saúde",
  ALIMENTACAO = "Alimentação",
  EXERCICIOS = "Exercícios",
  GERAL = "Geral",
}

export interface IPublicacaoBody {
  idUsuario: number;
  titulo: string;
  descricao: string;
  dataHora: Date;
  categoria: ECategoriaPublicacao;
  contagemReportes: number;
  usuario : IUser;
}

export interface IPublicacao extends IPublicacaoBody {
  id: number;
}
