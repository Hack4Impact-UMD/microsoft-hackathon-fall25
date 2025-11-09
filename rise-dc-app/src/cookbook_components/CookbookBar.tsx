import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";

interface CookbookBarProps {
  showMyRecipes?: boolean; // optional toggle
}

export default function CookbookBar({
  showMyRecipes = true,
}: CookbookBarProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row items-center justify-between w-full">
      <BackButton />

      {showMyRecipes && (
        <div
          className="flex flex-row items-center justify-center cursor-pointer mr-8"
          onClick={() => navigate({ pathname: "/cookbook/my-recipes" })}
        >
          <span className="mr-4 font-light text-xl flex items-center">
            My Recipes
          </span>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-8 h-8"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 
                     2 12.28 2 8.5 
                     2 5.42 4.42 3 7.5 3
                     c1.74 0 3.41 0.81 4.5 2.09 
                     C13.09 3.81 14.76 3 16.5 3 
                     19.58 3 22 5.42 22 8.5
                     c0 3.78-3.4 6.86-8.55 11.54
                     L12 21.35z"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
