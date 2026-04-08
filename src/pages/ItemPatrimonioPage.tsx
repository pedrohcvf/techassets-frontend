import React, { useEffect, useState } from "react"
import { ItemPatrimonioResponse, ItemPatrimonioRequest } from "../types/itemPatrimonio"
import { listarItens, cadastrarItem, deletarItem, atualizarItem } from '../services/itemPatrimonioService'
import { listarColaboradores } from "../services/colaboradorService"
import { ColaboradorResponse } from "../types/colaborador"

function ItemPatrimonioPge() {

  const [itens, setItemPatrimonio]         = useState<ItemPatrimonioResponse[]>([])
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState<string | null>(null)
  const [modalAberto, setModalAberto]     = useState(false)
  const [itemEditando, setItemEditando]   = useState<ItemPatrimonioResponse | null>(null)
  const [itemDeletando, setItemDeletando] = useState<ItemPatrimonioResponse | null>(null)
  const [colaboradores, setColaboradores] = useState<ColaboradorResponse[]>([])
  const [form, setForm]                   = useState<ItemPatrimonioRequest>({
    nome: '',
    numeroSerie: '',
    categoria: '',
    colaboradorId: 0,
    statusItem: '',
    fornecedor: ''
  })

  /* CARREGAR ITENS */
  async function carregarItens() {
    setLoading(true)
    setError(null)
    try {
      const itensData = await listarItens()
      setItemPatrimonio(itensData)
    } catch {
      setError('Não foi possível carregar os itens de patrimônio.')
    } finally {
      setLoading(false)
    }
  }

  /* CARREGAR COLABORADORES PARA O SELECT */
  async function carregarColaboradores() {
    try {
      const colaboradoresData = await listarColaboradores()
      setColaboradores(colaboradoresData)
    } catch {
      setError('Não foi possível carregar os colaboradores.')
    }
  }

  /* CADASTRAR NOVO ITEM */
  async function handleCadastrar(e: React.FormEvent) {
    e.preventDefault()
    try {
      await cadastrarItem(form)
      setModalAberto(false)
      setForm({ nome: '', numeroSerie: '', categoria: '', colaboradorId: 0, statusItem: '', fornecedor: '' })
      carregarItens()
    } catch {
      alert('Não foi possível cadastrar o item de patrimônio.')
    }
  }

  /* ATUALIZAR ITEM */
  async function handleAtualizar(e: React.FormEvent) {
    e.preventDefault()
    if (!itemEditando) return
    try {
      await atualizarItem(itemEditando.id, form)
      setItemEditando(null)
      setForm({ nome: '', numeroSerie: '', categoria: '', colaboradorId: 0, statusItem: '', fornecedor: '' })
      carregarItens()
    } catch {
      alert('Não foi possível atualizar o item de patrimônio.')
    }
  }

  /* DELETAR ITEM */
  async function handleDeletar() {
    if (!itemDeletando) return
    try {
      await deletarItem(itemDeletando.id)
      setItemDeletando(null)
      carregarItens()
    } catch {
      alert('Não foi possível deletar o item de patrimônio.')
    }
  }

  /* ABRIR MODAL DE EDIÇÃO */
  function handleEditar(item: ItemPatrimonioResponse) {
    setItemEditando(item)
    setForm({
      nome: item.nome,
      numeroSerie: item.numeroSerie,
      categoria: item.categoria,
      colaboradorId: 0,
      statusItem: item.statusItem,
      fornecedor: item.fornecedor
    })
  }

  /* ATUALIZAR FORM ENQUANTO USUÁRIO DIGITA */
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'colaboradorId' ? Number(value) : value
    }))
  }

  useEffect(() => {
    carregarItens()
    carregarColaboradores()
  }, [])

  /* BADGE DE STATUS */
  function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
      DISPONIVEL: 'text-success border-success/30 bg-success/10',
      ALOCADO:    'text-info border-info/30 bg-info/10',
      MANUTENCAO: 'text-primary border-primary/30 bg-primary/10',
      BAIXADO:    'text-white/30 border-white/10 bg-white/5',
    }
    const labels: Record<string, string> = {
      DISPONIVEL: 'Disponível',
      ALOCADO:    'Alocado',
      MANUTENCAO: 'Manutenção',
      BAIXADO:    'Baixado',
    }
    return (
      <span className={`text-xs font-mono px-2 py-0.5 border ${styles[status] ?? styles['BAIXADO']}`}>
        {labels[status] ?? status}
      </span>
    )
  }

  /* CAMPOS DO FORMULÁRIO — reutilizado nos dois modais */
  function FormFields() {
    return (
      <>
        <div>
          <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                 style={{ fontFamily: 'JetBrains Mono, monospace' }}>Nome</label>
          <input name="nome" value={form.nome} onChange={handleChange}
            placeholder="ex: Notebook Dell XPS"
            className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors placeholder:text-white/20" />
        </div>
        <div>
          <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                 style={{ fontFamily: 'JetBrains Mono, monospace' }}>Número de Série</label>
          <input name="numeroSerie" value={form.numeroSerie} onChange={handleChange}
            placeholder="ex: SN-2026-001"
            className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors placeholder:text-white/20" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                   style={{ fontFamily: 'JetBrains Mono, monospace' }}>Categoria</label>
            <input name="categoria" value={form.categoria} onChange={handleChange}
              placeholder="ex: Computador"
              className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors placeholder:text-white/20" />
          </div>
          <div>
            <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                   style={{ fontFamily: 'JetBrains Mono, monospace' }}>Fornecedor</label>
            <input name="fornecedor" value={form.fornecedor} onChange={handleChange}
              placeholder="ex: Dell Brasil"
              className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors placeholder:text-white/20" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                   style={{ fontFamily: 'JetBrains Mono, monospace' }}>Status</label>
            <select name="statusItem" value={form.statusItem} onChange={handleChange}
              className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors">
              <option value="">Selecione...</option>
              <option value="DISPONIVEL">Disponível</option>
              <option value="ALOCADO">Alocado</option>
              <option value="MANUTENCAO">Manutenção</option>
              <option value="BAIXADO">Baixado</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-white/40 uppercase tracking-widest block mb-1"
                   style={{ fontFamily: 'JetBrains Mono, monospace' }}>Colaborador</label>
            <select name="colaboradorId" value={form.colaboradorId} onChange={handleChange}
              className="w-full bg-background border border-border text-white text-sm px-3 py-2 outline-none focus:border-primary transition-colors">
              <option value={0}>Selecione...</option>
              {colaboradores.map(c => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>
        </div>
      </>
    )
  }

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
            Itens de Patrimônio
          </h1>
        </div>
        <button
          onClick={() => setModalAberto(true)}
          className="bg-primary text-black text-sm font-bold px-4 py-2 hover:brightness-110 transition-all"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          + Novo Item
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
                {['Nome', 'Nº de Série', 'Categoria', 'Colaborador', 'Status', 'Fornecedor', 'Ações'].map(col => (
                  <th key={col}
                      className="text-left px-4 py-3 text-white/30 text-xs uppercase tracking-widest"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {itens.length === 0 ? (
                <tr>
                  <td colSpan={7}
                      className="px-4 py-8 text-center text-white/20 text-sm"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Nenhum item cadastrado.
                  </td>
                </tr>
              ) : (
                itens.map(item => (
                  <tr key={item.id}
                      className="border-b border-border/50 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium">{item.nome}</td>
                    <td className="px-4 py-3 text-sm text-white/50"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {item.numeroSerie}
                    </td>
                    <td className="px-4 py-3 text-sm text-white/50">{item.categoria}</td>
                    <td className="px-4 py-3 text-sm text-white/50">{item.nomeColaborador}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={item.statusItem} />
                    </td>
                    <td className="px-4 py-3 text-sm text-white/50">{item.fornecedor}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditar(item)}
                          className="text-xs text-white/30 hover:text-primary transition-colors"
                        >
                          editar
                        </button>
                        <button
                          onClick={() => setItemDeletando(item)}
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
                Cadastrar Item
              </h2>
            </div>
            <form onSubmit={handleCadastrar} className="flex flex-col gap-3">
              <FormFields />
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
      {itemEditando && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
             onClick={() => setItemEditando(null)}>
          <div className="bg-surface border border-border w-full max-w-md p-6"
               onClick={e => e.stopPropagation()}>
            <div className="mb-5">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-1"
                 style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                // editar registro
              </p>
              <h2 className="text-lg font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                Editar Item
              </h2>
            </div>
            <form onSubmit={handleAtualizar} className="flex flex-col gap-3">
              <FormFields />
              <div className="flex gap-2 mt-2">
                <button type="submit"
                  className="flex-1 bg-primary text-black font-bold text-sm py-2 hover:brightness-110 transition-all"
                  style={{ fontFamily: 'Syne, sans-serif' }}>
                  Salvar
                </button>
                <button type="button" onClick={() => setItemEditando(null)}
                  className="px-4 border border-border text-white/40 text-sm hover:text-white hover:border-white/30 transition-colors">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmar delete */}
      {itemDeletando && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
             onClick={() => setItemDeletando(null)}>
          <div className="bg-surface border border-border w-full max-w-sm p-6"
               onClick={e => e.stopPropagation()}>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-1"
               style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              // confirmar ação
            </p>
            <h2 className="text-lg font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              Remover Item
            </h2>
            <p className="text-sm text-white/50 mb-6">
              Tem certeza que deseja remover{' '}
              <span className="text-white font-medium">{itemDeletando.nome}</span>?
              Essa ação não pode ser desfeita.
            </p>
            <div className="flex gap-2">
              <button onClick={handleDeletar}
                className="flex-1 bg-danger text-white font-bold text-sm py-2 hover:brightness-110 transition-all"
                style={{ fontFamily: 'Syne, sans-serif' }}>
                Remover
              </button>
              <button onClick={() => setItemDeletando(null)}
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

export default ItemPatrimonioPge