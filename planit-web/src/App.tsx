import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Servico from './pages/Servico'
import DataHora from './pages/DataHora'
import Homepage from './pages/Homepage'
import Editar from './pages/Editar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Servico />} />
        <Route path="/Data" element={<DataHora />} />
        <Route path="/Home" element={<Homepage />} />
        <Route path="/Editar" element={<Editar />} />
      </Routes>
    </Router>
  )
}

export default App;
