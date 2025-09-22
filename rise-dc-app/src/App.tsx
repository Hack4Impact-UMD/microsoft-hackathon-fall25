import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './shared/components/Navbar'
import Home from './pages/Home'
import Cookbook from './pages/Cookbook'
import Scheduler from './pages/Scheduler'
import AllRecipes from './pages/cookbook/AllRecipes'
import MyRecipes from './pages/cookbook/MyRecipes'
import RecipesByMeal from './pages/cookbook/RecipesByMeal'
import RecipePreview from './pages/cookbook/RecipePreview'
import InstructionPage from './pages/cookbook/InstructionPage'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cookbook" element={<Cookbook />} />
        <Route path="/cookbook/all-recipes" element={<AllRecipes />} />
        <Route path="/cookbook/my-recipes" element={<MyRecipes />} />
        <Route path="/cookbook/:meal" element={<RecipesByMeal />} />
        <Route path="/cookbook/recipe/:recipeId" element={<RecipePreview />} />
        <Route path="/cookbook/recipe/:recipeId/:stepNum" element={<InstructionPage />} />
        <Route path="/scheduler" element={<Scheduler />} />
      </Routes>
    </Router>
  )
}

export default App