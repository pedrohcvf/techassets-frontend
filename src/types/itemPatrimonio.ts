export interface ItemPatrimonioRequest{
    nome: string;
    numeroSerie: string;
    categoria: string;
    colaboradorId: number;
    statusItem: string;
    fornecedor: string;
}

export interface ItemPatrimonioResponse{
    id: number;
    nome: string;
    numeroSerie: string;
    categoria: string;
    nomeColaborador: string;
    statusItem: string;
    fornecedor: string;   
}