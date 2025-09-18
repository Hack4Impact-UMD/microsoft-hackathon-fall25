import { useNavigate } from "react-router";
import Slideshow from "../../shared/components/Slideshow";
import ImageCardStar from "../../shared/components/ImageCardStar";

export default function MyRecipes() {
  const navigate = useNavigate();

  const placeholder =
    "https://www.cranfield-colours.co.uk/wp-content/uploads/2022/01/cranfield-traditional-etching-ink-mid-black-400x221.jpg";

  return (
    <div className="p-10 flex flex-col space-y-5">
      <button onClick={() => navigate({ pathname: "/cookbook" })}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M36.6654 34.0297C32.5876 29.0519 28.9665 26.2275 25.802 25.5563C22.6376 24.8852 19.6248 24.7838 16.7637 25.2522V34.1663L3.33203 19.6205L16.7637 5.83301V14.3055C22.0543 14.3472 26.552 16.2452 30.257 19.9997C33.9615 23.7541 36.0976 28.4308 36.6654 34.0297Z"
            fill="black"
            stroke="black"
            strokeWidth="3.33333"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <h1 className="text-3xl font-bold">My Recipes</h1>

      {/* Breakfast */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Breakfast</h2>
        <Slideshow
          title=""
          images={[
            <ImageCardStar
              key="b1"
              src={placeholder}
              caption="Meal Title"
              defaultFavorite
            />,
            <ImageCardStar
              key="b2"
              src={placeholder}
              caption="Meal Title"
              defaultFavorite
            />,
          ]}
          imagesPerRow={2}
        />
      </div>

      {/* Lunch/Dinner */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Lunch/Dinner</h2>
        <Slideshow
          title=""
          images={[
            <ImageCardStar key="ld1" src={placeholder} caption="Meal Title" defaultFavorite />,
            <ImageCardStar key="ld2" src={placeholder} caption="Meal Title" defaultFavorite />,
            <ImageCardStar key="ld3" src={placeholder} caption="Meal Title" defaultFavorite />,
            <ImageCardStar key="ld4" src={placeholder} caption="Meal Title" defaultFavorite />,
          ]}
          imagesPerRow={2}
        />
      </div>
    </div>
  );
}