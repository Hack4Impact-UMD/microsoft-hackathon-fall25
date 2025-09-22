import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  fallbackPath?: string; // optional, in case there's no history
}

export default function BackButton({ fallbackPath = "/" }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.history.length > 1) {
      navigate(-1); // go back
    } else {
      navigate(fallbackPath); // fallback if no history
    }
  };

  return (
    <button
      onClick={handleClick}
      className="self-start cursor-pointer rounded-full bg-pink-500 p-2"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M36.6654 34.0297C32.5876 29.0519 28.9665 26.2275 25.802 25.5563C22.6376 24.8852 19.6248 24.7838 16.7637 25.2522V34.1663L3.33203 19.6205L16.7637 5.83301V14.3055C22.0543 14.3472 26.552 16.2452 30.257 19.9997C33.9615 23.7541 36.0976 28.4308 36.6654 34.0297Z"
          fill="white"
          stroke="white"
          stroke-width="3.33333"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
}
