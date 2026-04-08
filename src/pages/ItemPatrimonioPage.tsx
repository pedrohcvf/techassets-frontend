import { useEffect, useState } from "react"
import { ItemPatrimonioResponse } from "../types/itemPatrimonio"
import { listarItens } from '../services/itemPatrimonioService';

function ItemPatrimonioPge() {

    const [itens, setItemPatrimonio] = useState<ItemPatrimonioResponse[]>([])

    useEffect(() => {
        listarItens().then(data => setItemPatrimonio(data))
    })

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Itens de Patrimônio</h1>
            <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-100">
                <th className="border p-2 text-left">Nome</th>
                <th className="border p-2 text-left">Número de Série</th>
                <th className="border p-2 text-left">Categoria</th>
                <th className="border p-2 text-left">Colaborador</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Fornecedor</th>
                </tr>
            </thead>
            <tbody>
                {itens.map(item => (
                <tr key={item.id}>
                    <td className="border p-2">{item.nome}</td>
                    <td className="border p-2">{item.numeroSerie}</td>
                    <td className="border p-2">{item.categoria}</td>
                    <td className="border p-2">{item.nomeColaborador}</td>
                    <td className="border p-2">{item.statusItem}</td>
                    <td className="border p-2">{item.fornecedor}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )

}

export default ItemPatrimonioPge