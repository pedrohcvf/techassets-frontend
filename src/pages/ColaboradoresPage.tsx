import { useEffect, useState } from "react";
import {ColaboradorResponse} from "../types/colaborador"
import {listarColaboradores} from "../services/colaboradorService"

function ColaboradoresPage(){

    const [colaboradores, setColaboradores] = useState<ColaboradorResponse[]>([])

    useEffect(() => {
        listarColaboradores().then(data => setColaboradores(data))
    }, [])

    return(
    <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Colaboradores</h1>
        <table className="w-full border-collapse">
        <thead>
            <tr className="bg-gray-100">
            <th className="border p-2 text-left">Nome</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Departamento</th>
            <th className="border p-2 text-left">Cargo</th>
            <th className="border p-2 text-left">Ativo</th>
            </tr>
        </thead>
        <tbody>
            {colaboradores.map(colaborador => (
            <tr key={colaborador.id}>
                <td className="border p-2">{colaborador.nome}</td>
                <td className="border p-2">{colaborador.email}</td>
                <td className="border p-2">{colaborador.departamento}</td>
                <td className="border p-2">{colaborador.cargo}</td>
                <td className="border p-2">{colaborador.ativo ? 'Sim' : 'Não'}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    )

}

export default ColaboradoresPage