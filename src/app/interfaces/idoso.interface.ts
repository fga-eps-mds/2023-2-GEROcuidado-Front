import { IUser } from "./user.interface";

export enum ETipoSanguineo {
    A_POSITIVO = "A+",
    A_NEGATIVO = "A-",
    B_POSITIVO = "B+",
    B_NEGATIVO = "B-",
    AB_POSITIVO = "AB+",
    AB_NEGATIVO = "AB-",
    O_POSITIVO = "O+",
    O_NEGATIVO = "O",
}

export interface IIdosoBody {
    nome: string;
    dataNascimento: Date | string;
    idUsuario: number;
    foto?: string |  null;
    tipoSanguineo?: ETipoSanguineo | null;
    telefoneResponsavel: string;
    descricao?: string;
}

export interface IIdoso extends IIdosoBody {
    id: number;
    usuario?: IUser;
}

export interface IIdosoParams extends IIdosoBody, IUser {
    id: number;
    usuario?: IUser;
}

export interface IIdosoUsuario extends IIdoso, IUser {}

export interface IIdosoFilter {
    nome?: string;
}

export interface IOrder {
    column: string;
    dir: "DESC" | "ASC";
  }