import axios from "axios";
import {ItemPatrimonioRequest, ItemPatrimonioResponse} from "../types/itemPatrimonio";

const API_URL = "http://localhost:8080/itens"

// LISTAR ITENS
export const listarItens = async (): Promise<ItemPatrimonioResponse[]> =>{
    const response = await axios.get(API_URL);
    return response.data;
} 

// LISTAR ITEM POR ID
export const buscarItemPorId = async (id: number): Promise<ItemPatrimonioResponse> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

// LISTAR POR COLABORADOR
export const listarPorColaborador = async (colaboradorId: number): Promise<ItemPatrimonioResponse[]> => {
    const response = await axios.get(`${API_URL}/${colaboradorId}/colaborador`);
    return response.data
}

// LISTAR POR STATUS
export const listarPorStatus = async (status: string): Promise<ItemPatrimonioResponse[]> =>{
    const response = await axios.get(`${API_URL}/${status}/status`);
    return response.data
}

// CADASTRAR ITEM
export const cadastrarItem = async (item: ItemPatrimonioRequest): Promise<ItemPatrimonioResponse> => {
    const response = await axios.post(API_URL, item);
    return response.data
}

// ATUALIZAR ITEM
export const atualizarItem = async (id: number, item: ItemPatrimonioRequest): Promise<ItemPatrimonioResponse> => {
    const response = await axios.put(`${API_URL}/${id}`, item);
    return response.data
}

// DELETAR ITEM
export const deletarItem = async(id: number): Promise<void> => {
    const response = await axios.delete(`${API_URL}/${id}`);
}