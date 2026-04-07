export interface ColaboradorRequest{
    nome: string;
    email: string;
    departamento: string;
    cargo: string;
    ativo: boolean;
}

export interface ColaboradorResponse{
    id: number;
    nome: string;
    email: string;
    departamento: string;
    cargo: string;
    ativo: boolean; 
}