import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import ProdutosPage from "./pages/ProdutosPage"
import ColaboradoresPage from "./pages/ColaboradoresPage"
import MovimentacoesPage from "./pages/MovimentacoesPage"
import ItemPatrimonioPge from "./pages/ItemPatrimonioPage"


function App() {
  return (

    <Routes>
      <Route path="/produtos" element = {<ProdutosPage />} />
      <Route path="/colaboradores" element = {<ColaboradoresPage/>} />
      <Route path="/movimentacoes" element = {<MovimentacoesPage/>} />
      <Route path="/itens" element = {<ItemPatrimonioPge/>} />
    </Routes>

  )
}

export default App