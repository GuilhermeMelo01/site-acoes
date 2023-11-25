import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import { ListarTodasAcoes } from './components/ListarTodasAcoes/ListarTodasAcoes'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path='/acoes' element={<ListarTodasAcoes />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
