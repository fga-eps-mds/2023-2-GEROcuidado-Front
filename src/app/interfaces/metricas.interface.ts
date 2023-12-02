
export enum EMetricas {
    FREQ_CARDIACA = "Frequência Cardíaca",
    TEMPERATURA = "Temperatura",
    PRESSAO_SANGUINEA = "Pressão Sanguínea",
    PESO = "Peso",
    GLICEMIA = "Glicemia",
    SATURACAO_OXIGENIO = "Saturação Oxigênio",
}

export interface IMetricaBody {
    categoria: EMetricas;
    valor: number;
    dataHora: Date | string;
    idUsuario: number;
    idIdoso: number;    
}

export interface IMetrica extends IMetricaBody {
    id: number;
}