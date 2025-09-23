import { useNavigate } from "react-router";
import ImageCard from "../shared/components/ImageCard";
import Slideshow from "../shared/components/Slideshow";
import styles from "./Page.module.css";
import CookbookBar from "../cookbook_components/CookbookBar";

export default function Cookbook() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className="p-10">
        <CookbookBar />

        <Slideshow
          className="mt-5"
          title="Welcome Chef!"
          images={[
            <ImageCard
              src="/all_recipes.png"
              onClick={() => navigate({ pathname: "/cookbook/all-recipes" })}
              caption="All Recipes"
              isSection={true}
            />,
            <ImageCard
              src="/meal_plan.png"
              caption="Meal Plan"
              isSection={true}
            />,
            <ImageCard
              src="/grocery_list.png"
              caption="Grocery List"
              onClick={() => navigate({ pathname: "/cookbook/groceryList/" })}
              isSection={true}
            />,
          ]}
          imagesPerRow={2}
        />
      </div>
    </div>
  );
}
