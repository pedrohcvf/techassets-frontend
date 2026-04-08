import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import ProdutosPage from "./pages/ProdutosPage"
import ColaboradoresPage from "./pages/ColaboradoresPage"
import MovimentacoesPage from "./pages/MovimentacoesPage"
import ItemPatrimonioPge from "./pages/ItemPatrimonioPage"
import Sidebar from "./components/Sidebar"
import DashboardPage from "./pages/DashboardPage"


function App() {
  return (
    <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="ml-52 flex-1">
        <Routes>
          <Route path="/produtos" element = {<ProdutosPage />} />
          <Route path="/colaboradores" element = {<ColaboradoresPage/>} />
          <Route path="/movimentacoes" element = {<MovimentacoesPage/>} />
          <Route path="/itens" element = {<ItemPatrimonioPge/>} />
          <Route path="/" element = {<DashboardPage />} />
        </Routes>
        </main>
    </div>
    

  )
}

export default App