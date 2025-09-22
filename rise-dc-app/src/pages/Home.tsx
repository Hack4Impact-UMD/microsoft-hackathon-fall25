
import { useNavigate } from "react-router-dom";
import ImageCard from "../shared/components/ImageCard";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col py-10 items-center justify-center">
      <h1 className="text-3xl">Hi!</h1>
      <div className="my-10 flex flex-row space-x-5">
        <ImageCard
          src={"/scheduler.png"}
          isSection={true}
          caption={"Scheduling"}
          onClick={() => navigate("/scheduler")}
        />
        <ImageCard
          src={"/cookbook.png"}
          isSection={true}
          caption={"Cookbook"}
          onClick={() => navigate("/cookbook")}
        />
      </div>
    </div>
  );
}
