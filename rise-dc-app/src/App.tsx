import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './shared/components/Navbar'
import Home from './pages/Home'
import Cookbook from './pages/Cookbook'
import Scheduler from './pages/Scheduler'
import AllRecipes from './pages/cookbook/AllRecipes'
import MyRecipes from './pages/cookbook/MyRecipes'
import RecipesByCategory from './pages/cookbook/RecipesByCategory'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cookbook" element={<Cookbook />} />
        <Route path="/cookbook/all-recipes" element={<AllRecipes />} />
        <Route path="/cookbook/my-recipes" element={<MyRecipes />} />
        <Route path="/cookbook/:category" element={<RecipesByCategory />} />
        <Route path="/scheduler" element={<Scheduler />} />
      </Routes>
    </Router>
  )
}

export default App