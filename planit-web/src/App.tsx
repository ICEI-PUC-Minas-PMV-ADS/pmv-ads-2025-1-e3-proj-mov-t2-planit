import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Agendamento from './pages/Agendamento'
import Homepage from './pages/Homepage'
import Editar from './pages/Editar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Agendamento />} />
        <Route path="/Home" element={<Homepage />} />
        <Route path="/Editar" element={<Editar />} />
      </Routes>
    </Router>
  )
}

export default App;
