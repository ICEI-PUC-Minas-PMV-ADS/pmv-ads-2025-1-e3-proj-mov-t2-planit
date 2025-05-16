import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SeletcServico from './pages/SeletcServico'
import SelectDataHora from './pages/SelectDataHora'
import Homepage from './pages/Homepage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SeletcServico />} />
        <Route path="/Data" element={<SelectDataHora />} />
        <Route path="/Home" element={<Homepage />} />
      </Routes>
    </Router>
  )
}

export default App;
