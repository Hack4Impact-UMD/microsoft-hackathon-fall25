
import { useNavigate } from "react-router-dom";
import ImageCard from "../shared/components/ImageCard";
import styles from './Page.module.css'

export default function Home() {
  const navigate = useNavigate();
  const placeholder =
    "https://www.cranfield-colours.co.uk/wp-content/uploads/2022/01/cranfield-traditional-etching-ink-mid-black-400x221.jpg";

  return (
    <div className="flex flex-col py-10 items-center justify-center">
      <h1 className="text-3xl">Hi!</h1>
      <div className="p-15 flex flex-row space-x-5">
        <ImageCard
          src={placeholder}
          caption={"Scheduling"}
          onClick={() => navigate("/scheduler")}
        />
        <ImageCard
          src={placeholder}
          caption={"Cookbook"}
          onClick={() => navigate("/cookbook")}
        />
      </div>
    </div>
  );
}
