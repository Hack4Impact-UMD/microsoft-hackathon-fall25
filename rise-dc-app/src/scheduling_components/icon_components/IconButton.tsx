import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton as MuiIconButton, Backdrop } from '@mui/material';
import { ModeEdit } from '@mui/icons-material';
import IconCard from './IconCard';

// Import shared icon configuration
import { iconList } from './iconConfig';

/**
 * IconButton Component
 * 
 * A button that when clicked, toggles the display of the IconCard component.
 * Displays the selected icon instead of the edit icon when an icon is selected.
 * 
 * Features:
 * - Toggle button to show/hide icon selection
 * - Popup, so closes when clicked off or the escape key is pressed
 * - Dynamic icon display based on selection
 */

interface IconButtonProps {
  /** Button text to display */
  buttonText?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ 
  buttonText = "Select Activity" 
}) => {
  // State to control whether the icon card is visible
  const [showIconCard, setShowIconCard] = useState(false);
  // State to track the selected icon
  const [selectedIcon, setSelectedIcon] = useState<{name: string, icon: React.ComponentType<any>} | null>(null);
  const iconCardRef = useRef<HTMLDivElement>(null);

  /**
   * Handles icon selection from the IconCard component
   * @param category - The category of the selected icon (not used anymore)
   * @param iconName - The name of the selected activity
   * @param iconType - The MUI icon type
   */
  const handleIconSelect = (iconName: string) => {
    // Find the icon component from iconList
    const iconOption = iconList.find(icon => icon.name === iconName);
    
    // Update local state with selected icon
    setSelectedIcon({
      name: iconName,
      icon: iconOption?.icon || ModeEdit
    });
    
    // Hide the icon card after selection
    setShowIconCard(false);
  };

  /**
   * Toggles the visibility of the icon card
   */
  const handleButtonClick = () => {
    setShowIconCard(!showIconCard);
  };

  /**
   * Closes the icon card
   */
  const closeIconCard = () => {
    setShowIconCard(false);
  };

  /**
   * Handle click outside to close the popup
   */
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (iconCardRef.current && !iconCardRef.current.contains(event.target as Node)) {
      closeIconCard();
    }
  };

  /**
   * Handle escape key to close the popup
   */
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showIconCard) {
        closeIconCard();
      }
    };

    if (showIconCard) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when popup is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [showIconCard]);

  return (
    <>
      {/* Toggle Button */}
      <MuiIconButton
        onClick={handleButtonClick}
        sx={{
          backgroundColor: selectedIcon ? '#FD8743' : 'transparent',
          color: selectedIcon ? 'white' : '#FD8743',
          width: 56,
          height: 56,
          borderRadius: 2,
          boxShadow: 2,
            
        //   this is to create the checked icon background (lol)
              backgroundImage: selectedIcon ? 'none' : `
                linear-gradient(45deg, #E0E0E0 25%, transparent 25%), 
                linear-gradient(-45deg, #E0E0E0 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #E0E0E0 75%), 
                linear-gradient(-45deg, transparent 75%, #E0E0E0 75%)
              `,
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
          border: selectedIcon ? 'none' : '2px solid #FD8743',
          '&:hover': {
            backgroundColor: selectedIcon ? '#E67A3A' : 'rgba(253, 135, 67, 0.1)',
            boxShadow: 3
          }
        }}
        title={selectedIcon ? selectedIcon.name : (showIconCard ? 'Hide Activities' : buttonText)}
      >
            {selectedIcon ? (
              React.createElement(selectedIcon.icon, { sx: { fontSize: 28 } })
            ) : (
              <ModeEdit sx={{ fontSize: 28 }} />
            )}
      </MuiIconButton>

      {/* Popup Backdrop and Icon Card */}
      {showIconCard && (
        <Backdrop
          open={showIconCard}
          onClick={handleBackdropClick}
          sx={{
            zIndex: 1300,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2
          }}
        >
          <Box
            ref={iconCardRef}
            sx={{
              position: 'relative',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
          >
            <IconCard onIconSelect={handleIconSelect} onBackClick={closeIconCard} />
          </Box>
        </Backdrop>
      )}
    </>
  );
};

export default IconButton;
