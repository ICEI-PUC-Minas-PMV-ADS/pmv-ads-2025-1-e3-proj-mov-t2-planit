import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SeletcServico from './pages/SeletcServico'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SeletcServico />} />
      </Routes>
    </Router>
  )
}

export default App
