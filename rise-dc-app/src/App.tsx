import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './shared/components/Navbar'
import Home from './pages/Home'
import Cookbook from './pages/Cookbook'
import Scheduler from './pages/Scheduler'
import AllRecipes from './pages/AllRecipes'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cookbook" element={<Cookbook />} />
        <Route path="/cookbook/all-recipes" element={<AllRecipes />} />
        
        <Route path="/scheduler" element={<Scheduler />} />
      </Routes>
    </Router>
  )
}

export default App
