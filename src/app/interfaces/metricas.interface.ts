
export enum EMetricas {
    FREQ_CARDIACA = "Frequência Cardíaca",
    TEMPERATURA = "Temperatura",
    PRESSAO_SANGUINEA = "Pressão",
    PESO = "Peso",
    GLICEMIA = "Glicemia",
    SATURACAO_OXIGENIO = "Saturação Oxigênio",
}

export interface IMetricaBody {
    idIdoso: number;
    categoria: EMetricas;
}
export interface IMetrica extends IMetricaBody {
    id: number;
}
export interface IValorMetricaBody {
    categoria: EMetricas;
    valor: number;
    dataHora: Date | string;
    idUsuario: number;
    idIdoso: number;
}

export interface IValorMetrica extends IValorMetricaBody {
    id: number;
}