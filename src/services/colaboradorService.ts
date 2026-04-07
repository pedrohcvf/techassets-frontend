import axios from "axios";
import {ColaboradorRequest, ColaboradorResponse} from "../types/colaborador";

const API_URL = "http://localhost:8080/colaboradores";

// LISTAR COLABORADORES
export const listarColaboradores = async (): Promise<ColaboradorResponse[]> => {
    const response = await axios.get(API_URL);
    return response.data
}

// LISTAR POR ID
export const buscarColaboradorPorId = async (id: number): Promise<ColaboradorResponse> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

// CADASTRAR COLABORADOR
export const cadastrarColaborador = async (colaborador: ColaboradorRequest): Promise<ColaboradorResponse> =>{
    const response = await axios.post(API_URL, colaborador);
    return response.data;
}

// ATUALIZAR COLABORADOR
export const atualizarColaborador = async (id: number, colaborador: ColaboradorRequest): Promise<ColaboradorResponse> => {
    const response = await axios.put(`${API_URL}/${id}`, colaborador);
    return response.data;
}

// DELETAR COLABORADOR
export const deletarColaborador = async (id: number): Promise<void> => {
    const response = await axios.delete(`${API_URL}/${id}`);
}