import { useEffect, useState } from "react";
import {ColaboradorRequest, ColaboradorResponse} from "../types/colaborador"
import {listarColaboradores, atualizarColaborador, deletarColaborador, cadastrarColaborador} from "../services/colaboradorService"

function ColaboradoresPage(){

    const [colaboradores, setColaboradores] = useState<ColaboradorResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [modalAberto, setModalAberto] = useState(false)
    const [colaboradorEditando, setColaboradorEditando] = useState<ColaboradorResponse | null>(null)
    const [colaboradorDeletando, setColaboradorDeletando] = useState<ColaboradorResponse | null>(null)
    const [form, setForm] = useState<ColaboradorRequest>({
        nome: '',
        email: '',
        departamento: '',
        cargo: '',
        ativo: true
    })

    {/* CARREGAR COLABORADORES */}
    async function carregarColaboradores(){
        setLoading(true)
        setError(null)
        try {
            const data = await listarColaboradores()
            setColaboradores(data)
        } catch {
            setError('Não foi possível carregar os colaboradores.')
        } finally {
            setLoading(false)
        }
    }

    {/* ATUALIZAR COLABORADORES */}
    async function handleAtualizar(e: React.FormEvent) {
        e.preventDefault()
        if (!colaboradorEditando) return

        try {
            await atualizarColaborador(colaboradorEditando.id, form)
            setColaboradorEditando(null)
            setForm({ nome: '', email: '', departamento: '', cargo: '', ativo: true })
            carregarColaboradores()
        } catch {
            setError('Não foi possível atualizar o colaborador.')
        }
    }

    {/* DELETAR COLABORADORES */}
    async function handleDeletar() {
        if (!colaboradorDeletando) return
        try {
            await deletarColaborador(colaboradorDeletando.id)
            setColaboradorDeletando(null)
            carregarColaboradores()
        } catch {
            setError('Não foi possível deletar o colaborador.')
        }
    }

    {/* CADASTRAR COLABORADORES */}
    async function handleCadastrar(e: React.FormEvent) {
        e.preventDefault()
        try {
            await cadastrarColaborador(form)
            setModalAberto(false)
            setForm({ nome: '', email: '', departamento: '', cargo: '', ativo: true })
            carregarColaboradores()
        } catch {
            setError('Não foi possível cadastrar o colaborador.')
        }
    }

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, type, checked } = e.target
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    useEffect(() => {
        carregarColaboradores()
    }, [])

    return (
        <div className="p-8">

            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-6">
            <div>
                <p className="text-xs text-white/30 uppercase tracking-widest mb-1"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                // módulo patrimônio
                </p>
                <h1 className="text-2xl font-bold"
                    style={{ fontFamily: 'Syne, sans-serif' }}>
                Colaboradores
                </h1>
            </div>
            <button
                onClick={() => setModalAberto(true)}
                className="bg-primary text-black text-sm font-bold px-4 py-2 hover:brightness-110 transition-all"
                style={{ fontFamily: 'Syne, sans-serif' }}
            >
                + Novo Colaborador
            </button>
            </div>

            {/* Loading e erro */}
            {loading && (
            <p className="text-white/30 text-sm"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Carregando...
            </p>
            )}
            {error && (
            <p className="text-danger text-sm border border-danger/30 bg-danger/10 px-4 py-2">
                {error}
            </p>
            )}

            {/* Tabela */}
            {!loading && !error && (
            <div className="border border-border">
                <table className="w-full">
                <thead>
                    <tr className="border-b border-border">
                    {['Nome', 'Email', 'Departamento', 'Cargo', 'Ativo', 'Ações'].map(col => (
                        <th key={col}
                            className="text-left px-4 py-3 text-white/30 text-xs uppercase tracking-widest"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {col}
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {colaboradores.length === 0 ? (
                    <tr>
                        <td colSpan={6}
                            className="px-4 py-8 text-center text-white/20 text-sm"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        Nenhum colaborador cadastrado.
                        </td>
                    </tr>
                    ) : (
                    colaboradores.map(colaborador => (
                        <tr key={colaborador.id}
                            className="border-b border-border/50 hover:bg-white/2 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium">{colaborador.nome}</td>
                        <td className="px-4 py-3 text-sm text-white/50">{colaborador.email}</td>
                        <td className="px-4 py-3 text-sm text-white/50">{colaborador.departamento}</td>
                        <td className="px-4 py-3 text-sm text-white/50">{colaborador.cargo}</td>
                        <td className="px-4 py-3 text-sm">
                            <span className={`text-xs font-mono px-2 py-0.5 border ${
                            colaborador.ativo
                                ? 'text-success border-success/30 bg-success/10'
                                : 'text-white/30 border-white/10 bg-white/5'
                            }`}>
                            {colaborador.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex gap-3">
                            <button
                                onClick={() => {
                                setColaboradorEditando(colaborador)
                                setForm({
                                    nome: colaborador.nome,
                                    email: colaborador.email,
                                    departamento: colaborador.departamento,
                                    cargo: colaborador.cargo,
                                    ativo: colaborador.ativo
                                })
                                }}
                                className="text-xs text-white/30 hover:text-primary transition-colors"
                            >
                                editar
                            </button>
                            <button
                                onClick={() => setColaboradorDeletando(colaborador)}
                                className="text-xs text-white/30 hover:text-danger transition-colors"
                            >
                                remover
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))
                    )}
                </tbody>
                </table>
            </div>
            )}

            {/* Modal de cadastro */}
            {modalAberto && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
                onClick={() => setModalAberto(false)}>
                <div className="bg-surface border border-border w-full max-w-md p-6"
                    onClick={e => e.stopPropagation()}>
                <div className="mb-5">
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-1"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    // novo registro
                    </p>
                    <h2 className="text-lg font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                    Cadastrar Colaborador
                    </h2>
                </div>
                <form onSubmit={handleCadastrar} className="flex flex-col gap-3">
                    <div>
                    <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}>Nome</label>
                    <input name="nome" value={form.nome} onChange={handleChange}
                        placeholder="ex: Pedro Carvalho"
                        className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors placeholder:text-white/20" />
                    </div>
                    <div>
                    <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}>Email</label>
                    <input name="email" value={form.email} onChange={handleChange}
                        placeholder="ex: pedro@techassets.com"
                        className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors placeholder:text-white/20" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}>Departamento</label>
                        <input name="departamento" value={form.departamento} onChange={handleChange}
                        placeholder="ex: Tecnologia"
                        className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors placeholder:text-white/20" />
                    </div>
                    <div>
                        <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}>Cargo</label>
                        <input name="cargo" value={form.cargo} onChange={handleChange}
                        placeholder="ex: Dev Backend"
                        className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors placeholder:text-white/20" />
                    </div>
                    </div>
                    <div className="flex items-center gap-3">
                    <input type="checkbox" name="ativo" checked={form.ativo} onChange={handleChange}
                        className="accent-primary w-4 h-4" />
                    <label className="text-sm text-white/60">Colaborador ativo</label>
                    </div>
                    <div className="flex gap-2 mt-2">
                    <button type="submit"
                        className="flex-1 bg-primary text-black font-bold text-sm py-2 hover:brightness-110 transition-all"
                        style={{ fontFamily: 'Syne, sans-serif' }}>
                        Cadastrar
                    </button>
                    <button type="button" onClick={() => setModalAberto(false)}
                        className="px-4 border border-border text-white/40 text-sm hover:text-white hover:border-white/30 transition-colors">
                        Cancelar
                    </button>
                    </div>
                </form>
                </div>
            </div>
            )}

            {/* Modal de editar */}
            {colaboradorEditando && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
                onClick={() => setColaboradorEditando(null)}>
                <div className="bg-surface border border-border w-full max-w-md p-6"
                    onClick={e => e.stopPropagation()}>
                <div className="mb-5">
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-1"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    // editar registro
                    </p>
                    <h2 className="text-lg font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                    Editar Colaborador
                    </h2>
                </div>
                <form onSubmit={handleAtualizar} className="flex flex-col gap-3">
                    <div>
                    <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}>Nome</label>
                    <input name="nome" value={form.nome} onChange={handleChange}
                        className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                    <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}>Email</label>
                    <input name="email" value={form.email} onChange={handleChange}
                        className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}>Departamento</label>
                        <input name="departamento" value={form.departamento} onChange={handleChange}
                        className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                        <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                            style={{ fontFamily: 'JetBrains Mono, monospace' }}>Cargo</label>
                        <input name="cargo" value={form.cargo} onChange={handleChange}
                        className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors" />
                    </div>
                    </div>
                    <div className="flex items-center gap-3">
                    <input type="checkbox" name="ativo" checked={form.ativo} onChange={handleChange}
                        className="accent-primary w-4 h-4" />
                    <label className="text-sm text-white/60">Colaborador ativo</label>
                    </div>
                    <div className="flex gap-2 mt-2">
                    <button type="submit"
                        className="flex-1 bg-primary text-black font-bold text-sm py-2 hover:brightness-110 transition-all"
                        style={{ fontFamily: 'Syne, sans-serif' }}>
                        Salvar
                    </button>
                    <button type="button" onClick={() => setColaboradorEditando(null)}
                        className="px-4 border border-border text-white/40 text-sm hover:text-white hover:border-white/30 transition-colors">
                        Cancelar
                    </button>
                    </div>
                </form>
                </div>
            </div>
            )}

            {/* Modal de confirmar delete */}
            {colaboradorDeletando && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
                onClick={() => setColaboradorDeletando(null)}>
                <div className="bg-surface border border-border w-full max-w-sm p-6"
                    onClick={e => e.stopPropagation()}>
                <p className="text-xs text-white/30 uppercase tracking-widest mb-1"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    // confirmar ação
                </p>
                <h2 className="text-lg font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                    Remover Colaborador
                </h2>
                <p className="text-sm text-white/50 mb-6">
                    Tem certeza que deseja remover{' '}
                    <span className="text-white font-medium">{colaboradorDeletando.nome}</span>?
                    Essa ação não pode ser desfeita.
                </p>
                <div className="flex gap-2">
                    <button onClick={handleDeletar}
                    className="flex-1 bg-danger text-white font-bold text-sm py-2 hover:brightness-110 transition-all"
                    style={{ fontFamily: 'Syne, sans-serif' }}>
                    Remover
                    </button>
                    <button onClick={() => setColaboradorDeletando(null)}
                    className="px-4 border border-border text-white/40 text-sm hover:text-white hover:border-white/30 transition-colors">
                    Cancelar
                    </button>
                </div>
                </div>
            </div>
            )}

        </div>
        )
}

export default ColaboradoresPage