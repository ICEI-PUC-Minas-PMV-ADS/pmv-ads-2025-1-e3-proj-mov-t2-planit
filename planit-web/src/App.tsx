import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SeletcServico from './pages/SeletcServico'
import SelectDataHora from './pages/SelectDataHora'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SeletcServico />} />
        <Route path="/Data" element={<SelectDataHora />} />
      </Routes>
    </Router>
  )
}

export default App;
