import { Route } from "react-router-dom"
import ProdutosPage from "./pages/ProdutosPage"
import { Routes } from "react-router-dom"


function App() {
  return (

    <Routes>
      <Route path="/produtos" element={<ProdutosPage />} />
    </Routes>

  )
}

export default App