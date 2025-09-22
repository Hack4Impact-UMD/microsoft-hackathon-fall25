import { useNavigate } from "react-router"; 
import ImageCard from '../shared/components/ImageCard';
import Slideshow from '../shared/components/Slideshow';
import styles from "./Page.module.css";
import BackButton from "../cookbook_components/BackButton";

export default function Cookbook() {
  let navigate = useNavigate()

  return (
    
    <div className={styles.container}>
      {/* <h1>Adaptive Digital Cookbook</h1>
      <p>Digital cookbook for users with cognitive and literacy challenges</p> */}
      <BackButton pathname="/" />

      <Slideshow 
        title="Welcome Chef!" 
        images={[
          <ImageCard 
            src="https://www.cranfield-colours.co.uk/wp-content/uploads/2022/01/cranfield-traditional-etching-ink-mid-black-400x221.jpg"
            onClick={() => navigate({pathname: '/cookbook/all-recipes'})}
            caption="All Recipes"
            isSection={true}
          />,
          <ImageCard 
            src="https://www.cranfield-colours.co.uk/wp-content/uploads/2022/01/cranfield-traditional-etching-ink-mid-black-400x221.jpg"
            caption="Meal Plan"
            isSection={true}
          />,
          <ImageCard 
            src="https://www.cranfield-colours.co.uk/wp-content/uploads/2022/01/cranfield-traditional-etching-ink-mid-black-400x221.jpg"
            onClick={() => navigate({pathname: '/cookbook/my-recipes'})}
            caption="My Recipes"
            isSection={true}
          />,
          <ImageCard 
            src="https://www.cranfield-colours.co.uk/wp-content/uploads/2022/01/cranfield-traditional-etching-ink-mid-black-400x221.jpg"
            caption="Grocery List?"
            isSection={true}
          />
        ]}
        imagesPerRow={2} 
      />
    </div>
  )
}
