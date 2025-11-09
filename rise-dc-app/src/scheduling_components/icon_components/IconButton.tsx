// Debug version with console logs to identify the issue

import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton as MuiIconButton, Backdrop } from "@mui/material";
import { ModeEdit } from "@mui/icons-material";
import IconCard from "./IconCard";
import { iconList } from "./iconConfig";

interface IconButtonProps {
  buttonText?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  buttonText = "Select Activity",
}) => {
  const [showIconCard, setShowIconCard] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<{
    name: string;
    icon: React.ComponentType<any>;
  } | null>(null);
  const iconCardRef = useRef<HTMLDivElement>(null);

  const handleIconSelect = (
    category: string,
    iconName: string,
    iconType: string,
  ) => {
    console.log("🔍 handleIconSelect called with:", {
      category,
      iconName,
      iconType,
    });
    console.log(
      "📋 Available icons in iconList:",
      iconList.map((icon) => icon.name),
    );

    // Find the icon component from iconList
    const iconOption = iconList.find((icon) => icon.name === iconName);
    console.log("🎯 Found icon option:", iconOption);

    if (iconOption) {
      const newSelection = {
        name: iconName,
        icon: iconOption.icon,
      };
      console.log("✅ Setting selected icon to:", newSelection);
      setSelectedIcon(newSelection);
    } else {
      console.log("❌ Icon not found in iconList for name:", iconName);
      console.log(
        "🔍 Exact match check - iconList names:",
        iconList.map((icon) => `"${icon.name}"`),
      );
      console.log("🔍 Searching for:", `"${iconName}"`);
    }

    setShowIconCard(false);
  };

  const handleButtonClick = () => {
    setShowIconCard(!showIconCard);
  };

  const closeIconCard = () => {
    setShowIconCard(false);
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (
      iconCardRef.current &&
      !iconCardRef.current.contains(event.target as Node)
    ) {
      closeIconCard();
    }
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showIconCard) {
        closeIconCard();
      }
    };

    if (showIconCard) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [showIconCard]);

  // Debug: Log when selectedIcon changes
  useEffect(() => {
    console.log("🔄 selectedIcon state changed to:", selectedIcon);
  }, [selectedIcon]);

  return (
    <>
      <MuiIconButton
        onClick={handleButtonClick}
        sx={{
          backgroundColor: selectedIcon ? "#FD8743" : "transparent",
          color: selectedIcon ? "white" : "#FD8743",
          width: 56,
          height: 56,
          borderRadius: 2,
          boxShadow: 2,
          backgroundImage: selectedIcon
            ? "none"
            : `
            linear-gradient(45deg, #E0E0E0 25%, transparent 25%), 
            linear-gradient(-45deg, #E0E0E0 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #E0E0E0 75%), 
            linear-gradient(-45deg, transparent 75%, #E0E0E0 75%)
          `,
          backgroundSize: "8px 8px",
          backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
          border: selectedIcon ? "none" : "2px solid #FD8743",
          "&:hover": {
            backgroundColor: selectedIcon
              ? "#E67A3A"
              : "rgba(253, 135, 67, 0.1)",
            boxShadow: 3,
          },
        }}
        title={
          selectedIcon
            ? selectedIcon.name
            : showIconCard
              ? "Hide Activities"
              : buttonText
        }
      >
        {selectedIcon ? (
          React.createElement(selectedIcon.icon, { sx: { fontSize: 28 } })
        ) : (
          <ModeEdit sx={{ fontSize: 28 }} />
        )}
      </MuiIconButton>

      {showIconCard && (
        <Backdrop
          open={showIconCard}
          onClick={handleBackdropClick}
          sx={{
            zIndex: 1300,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Box
            ref={iconCardRef}
            sx={{
              position: "relative",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <IconCard
              onIconSelect={handleIconSelect}
              onBackClick={closeIconCard}
            />
          </Box>
        </Backdrop>
      )}
    </>
  );
};

export default IconButton;
