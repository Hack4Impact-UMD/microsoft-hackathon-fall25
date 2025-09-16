import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cookbook from './pages/Cookbook'
import Scheduler from './pages/Scheduler'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cookbook" element={<Cookbook />} />
        <Route path="/scheduler" element={<Scheduler />} />
      </Routes>
    </Router>
  )
}

export default App
