import errorIcon from "../../assets/warning_icon.jpg";

type WarningProps = {
  text: string;
};

const Warning = ({ text }: WarningProps) => {
  return (
    <div className="px-8 py-4 bg-white border border-black flex items-center justify-center">
      <img src={errorIcon} alt="Warning icon" className="mr-4" />

      <span className="text-black text-xl font-bold">{text}</span>
    </div>
  );
};

export default Warning;
