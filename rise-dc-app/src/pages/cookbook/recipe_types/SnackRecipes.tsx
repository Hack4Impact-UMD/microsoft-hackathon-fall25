import { useNavigate } from "react-router"; 
import ImageCardStar from '../../../shared/components/ImageCardStar';
import Slideshow from '../../../shared/components/Slideshow';

export default function SnackRecipes() {
    const navigate = useNavigate();
    const placeholder = "https://www.cranfield-colours.co.uk/wp-content/uploads/2022/01/cranfield-traditional-etching-ink-mid-black-400x221.jpg";


    return (
        <div className="p-10 flex flex-col space-y-5">
            <button
                onClick={() => navigate({pathname: '/cookbook/all-recipes'})}
            >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M36.6654 34.0297C32.5876 29.0519 28.9665 26.2275 25.802 25.5563C22.6376 24.8852 19.6248 24.7838 16.7637 25.2522V34.1663L3.33203 19.6205L16.7637 5.83301V14.3055C22.0543 14.3472 26.552 16.2452 30.257 19.9997C33.9615 23.7541 36.0976 28.4308 36.6654 34.0297Z" fill="black" stroke="black" stroke-width="3.33333" stroke-linejoin="round"/>
                </svg>
            </button>

            <Slideshow 
                title="Snack" 
                images={[
                <ImageCardStar
                    key="s1"
                    src={placeholder}
                    caption="Meal Title"
                    defaultFavorite={false}
                />,
                <ImageCardStar
                    key="s2"
                    src={placeholder}
                    caption="Meal Title"
                    defaultFavorite={false}
                />,
                <ImageCardStar
                    key="s3"
                    src={placeholder}
                    caption="Meal Title"
                    defaultFavorite={false}
                />,
                <ImageCardStar
                    key="s4"
                    src={placeholder}
                    caption="Meal Title"
                    defaultFavorite={false}
                />,
                <ImageCardStar
                    key="s5"
                    src={placeholder}
                    caption="Meal Title"
                    defaultFavorite={false}
                />,
                <ImageCardStar
                    key="s6"
                    src={placeholder}
                    caption="Meal Title"
                    defaultFavorite={false}
                />
                ]}
                imagesPerRow={2} 
            />
        </div>
    );
}