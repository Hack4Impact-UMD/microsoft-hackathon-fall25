import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './shared/components/Navbar'
import Home from './pages/Home'
import Cookbook from './pages/Cookbook'
import Scheduler from './pages/Scheduler'
import AllRecipes from './pages/cookbook/AllRecipes'
import MyRecipes from './pages/cookbook/MyRecipes'
import BreakfastRecipes from './pages/cookbook/recipe_types/BreakfastRecipes'
import LunchDinnerRecipes from './pages/cookbook/recipe_types/LunchDinnerRecipes'
import SnackRecipes from './pages/cookbook/recipe_types/SnackRecipes'
import DessertRecipes from './pages/cookbook/recipe_types/DessertRecipes'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cookbook" element={<Cookbook />} />
        <Route path="/cookbook/all-recipes" element={<AllRecipes />} />
        <Route path="/cookbook/my-recipes" element={<MyRecipes />} />
        <Route path="/cookbook/all-recipes/breakfast" element={<BreakfastRecipes />} />
        <Route path="/cookbook/all-recipes/lunch-dinner" element={<LunchDinnerRecipes />} />
        <Route path="/cookbook/all-recipes/snack" element={<SnackRecipes />} />
        <Route path="/cookbook/all-recipes/dessert" element={<DessertRecipes />} />
        
        <Route path="/scheduler" element={<Scheduler />} />
      </Routes>
    </Router>
  )
}

export default App
