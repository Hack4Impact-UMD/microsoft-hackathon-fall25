import { useParams, useNavigate } from 'react-router-dom';
import { RecipeCategory } from '../../shared/types';
import { RecipeCardData, recipesByCategory } from '../../shared/data/dummyRecipes';
import ImageCard from '../../shared/components/ImageCard';
import styles from "../Page.module.css";

const categoryTitles: Record<RecipeCategory, string> = {
  breakfast: "Breakfast Recipes",
  lunchDinner: "Lunch & Dinner Recipes",
  snack: "Snack Recipes",
  dessert: "Dessert Recipes"
};

export default function RecipesByCategory() {
  const { category } = useParams<{ category: RecipeCategory }>();
  const navigate = useNavigate();

  if (!category || !recipesByCategory[category]) {
    return <div>Category not found</div>;
  }

  const recipes = recipesByCategory[category];
  
  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/cookbook/all-recipes')}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M36.6654 34.0297C32.5876 29.0519 28.9665 26.2275 25.802 25.5563C22.6376 24.8852 19.6248 24.7838 16.7637 25.2522V34.1663L3.33203 19.6205L16.7637 5.83301V14.3055C22.0543 14.3472 26.552 16.2452 30.257 19.9997C33.9615 23.7541 36.0976 28.4308 36.6654 34.0297Z" fill="black" stroke="black" strokeWidth="3.33333" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <h1>{categoryTitles[category]}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe: RecipeCardData) => (
          <ImageCard
            key={recipe.id}
            src={recipe.image}
            caption={recipe.title}
            onClick={() => navigate(`/cookbook/recipe/${recipe.id}`)}
          />
        ))}
      </div>
    </div>
  );
}