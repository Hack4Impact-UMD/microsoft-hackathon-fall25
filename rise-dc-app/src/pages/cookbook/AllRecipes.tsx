import { useNavigate } from "react-router"; 
import ImageCard from '../../shared/components/ImageCard';
import Slideshow from '../../shared/components/Slideshow';
import { recipes } from '../../shared/data/dummyRecipes';

// Get unique meal types from recipes
const MEAL_LABELS: Record<string, string> = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    snack: "Snack",
    dessert: "Dessert",
};

export default function AllRecipes() {
    const navigate = useNavigate();
    const placeholder = "https://www.cranfield-colours.co.uk/wp-content/uploads/2022/01/cranfield-traditional-etching-ink-mid-black-400x221.jpg";

    const mealTypes = [...new Set(recipes.flatMap(recipe => recipe.meal))].sort();

    return (
        <div className="p-10 flex flex-col space-y-5">
            <button onClick={() => navigate({pathname: '/cookbook'})}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M36.6654 34.0297C32.5876 29.0519 28.9665 26.2275 25.802 25.5563C22.6376 24.8852 19.6248 24.7838 16.7637 25.2522V34.1663L3.33203 19.6205L16.7637 5.83301V14.3055C22.0543 14.3472 26.552 16.2452 30.257 19.9997C33.9615 23.7541 36.0976 28.4308 36.6654 34.0297Z" fill="black" stroke="black" strokeWidth="3.33333" strokeLinejoin="round"/>
                </svg>
            </button>

            <Slideshow 
                title="Recipes" 
                images={mealTypes.map(meal => (
                    <ImageCard 
                        key={meal}
                        src={placeholder}
                        caption={MEAL_LABELS[meal]}
                        onClick={() => navigate(`/cookbook/${meal}`)}
                    />
                ))}
                imagesPerRow={2} 
            />
        </div>
    );
}