import React from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import CloseIcon from "@mui/icons-material/Close";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface ModalHeaderProps {
  onBack?: () => void;
  onClose: () => void;
  title: string;
  iconType?: "edit" | "time";
}

// Reusable Modal Header
const ModalHeader: React.FC<ModalHeaderProps> = ({
  onBack,
  onClose,
  title,
  iconType = "edit",
}) => {
  const renderIcon = () => {
    switch (iconType) {
      case "time":
        return <AccessTimeIcon style={{ fontSize: "30px" }} />;
      case "edit":
      default:
        return <ModeOutlinedIcon style={{ fontSize: "30px" }} />;
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      {onBack ? (
        <button
          className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600"
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ReplyIcon style={{ fontSize: "30px" }} />
        </button>
      ) : (
        <div className="w-10 h-10"></div>
      )}
      <div className="flex items-center space-x-2">
        {renderIcon()}
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      </div>
      <button
        className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-red-600"
        onClick={onClose}
      >
        <CloseIcon style={{ fontSize: "30px" }} />
      </button>
    </div>
  );
};

export default ModalHeader;
