import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './shared/components/Navbar'
import Home from './pages/Home'
import Cookbook from './pages/Cookbook'
import Scheduler from './pages/Scheduler'
import AllRecipes from './pages/AllRecipes'
import MyRecipes from './pages/MyRecipes'
import BreakfastRecipes from './pages/BreakfastRecipes'
import LunchDinnerRecipes from './pages/LunchDinnerRecipes'
import SnackRecipes from './pages/SnackRecipes'
import DessertRecipes from './pages/DessertRecipes'

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
