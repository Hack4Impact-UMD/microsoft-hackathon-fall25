import React, { useState, useMemo } from 'react';
import {
  TextField,
  Box,
  Typography,
  Chip,
  Tooltip,
  Card,
  CardActionArea
} from '@mui/material';

/**
 * IconDropdown Component
 * 
 * A searchable grid component that displays icons in a 4-column layout.
 * Users can search for specific activities and select them by clicking.
 * Designed for accessibility with large touch targets and clear visual feedback.
 * 
 * Features:
 * - Search functionality to filter icons
 * - 4-column responsive grid layout
 * - Visual selection feedback with orange highlighting
 * - Tooltips for better accessibility
 * - Selected icon display as a chip
 */
import {
  SportsSoccer,
  MenuBook,
  MusicNote,
  Palette,
  SportsEsports,
  CameraAlt,
  Restaurant,
  LocalFlorist,
  CleaningServices,
  LocalLaundryService,
  DinnerDining,
  Delete,
  ShoppingCart,
  Inventory,
  Build,
  Code,
  DesignServices,
  Edit,
  Translate,
  Calculate,
  Science,
  PresentToAll,
  Group,
  Shower,
  Face,
  ContentCut,
  FitnessCenter,
  Psychology,
  Bedtime,
  Medication
} from '@mui/icons-material';

/**
 * Icon Mapping Configuration
 * 
 * Maps icon names (strings) to their corresponding MUI icon components.
 * This allows dynamic icon rendering based on the icon name from the data.
 */
const iconMap: { [key: string]: React.ComponentType<any> } = {
  SportsSoccer,
  MenuBook,
  MusicNote,
  Palette,
  SportsEsports,
  CameraAlt,
  Restaurant,
  LocalFlorist,
  CleaningServices,
  LocalLaundryService,
  DinnerDining,
  Delete,
  ShoppingCart,
  Inventory,
  Build,
  Code,
  DesignServices,
  Edit,
  Translate,
  Calculate,
  Science,
  PresentToAll,
  Group,
  Shower,
  Face,
  ContentCut,
  FitnessCenter,
  Psychology,
  Bedtime,
  Medication
};

// name to icon mapping interface
interface IconOption {
  name: string;
  icon: string;
}

/**
 * Props interface for IconDropdown component
 */
interface IconDropdownProps {
  /** Category key (hobbies, chores, skills, hygiene) */
  category: string;
  /** Display title of the category */
  title: string;
  /** Array of icon options for this category */
  icons: IconOption[];
  /** Currently selected icon name */
  selectedIcon?: string;
  /** Callback function when an icon is selected (filler logic currently) */
  onIconSelect: (category: string, iconName: string, iconType: string) => void;
}

const IconDropdown: React.FC<IconDropdownProps> = ({
  category,
  title,
  icons,
  selectedIcon,
  onIconSelect
}) => {
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  
  // Find the currently selected icon data and component
  const selectedIconData = icons.find(icon => icon.name === selectedIcon);
  const SelectedIconComponent = selectedIconData ? iconMap[selectedIconData.icon] : null;

  /**
   * Filter icons based on search term
   */
  const filteredIcons = useMemo(() => {
    if (!searchTerm) return icons;
    return icons.filter(icon => 
      icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [icons, searchTerm]);

  /**
   * Handles icon selection when user clicks on an icon
   * @param iconOption - The selected icon option
   * this doesn't do anything yet
   */
  const handleIconClick = (iconOption: IconOption) => {
    onIconSelect(category, iconOption.name, iconOption.icon);
  };

  return (
    <Box>
      {/* Search Field */}
      <TextField
        fullWidth
        size="small"
        label={`Search ${title.toLowerCase()}`}
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ 
          mb: 2,
          '& .MuiInputLabel-root': {
            fontSize: '0.875rem'
          },
          '& .MuiInputBase-input': {
            fontSize: '0.875rem',
            padding: '12px 14px'
          }
        }}
      />

      {/* Selected Icon Display */}
      {selectedIcon && SelectedIconComponent && (
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Tooltip title={`Selected: ${selectedIcon}`}>
            <Chip
              icon={<SelectedIconComponent />}
              label={selectedIcon}
              variant="filled"
              sx={{ 
                backgroundColor: '#FD8743', 
                color: 'white',
                fontSize: '0.8rem',
                height: '28px',
                '& .MuiChip-icon': {
                  fontSize: '1.1rem'
                }
              }}
            />
          </Tooltip>
        </Box>
      )}

      {/* Icon Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 1,
        maxHeight: '160px',
        overflowY: 'auto',
        p: 1,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        backgroundColor: '#F5F5F5'
      }}>
        {/* depending on the iconOption, display icons with matching terms */}
        {filteredIcons.map((iconOption) => {
          const IconComponent = iconMap[iconOption.icon];
          const isSelected = selectedIcon === iconOption.name;
          
          return (
            <Tooltip key={iconOption.name} title={iconOption.name} placement="top">
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  border: isSelected ? 2 : 1,
                  borderColor: isSelected ? '#FD8743' : 'divider',
                  backgroundColor: isSelected ? '#FD8743' : '#F5F5F5',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 2,
                    borderColor: '#FD8743'
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => handleIconClick(iconOption)}
                  sx={{ 
                    p: 0, 
                    minHeight: '70px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: '100%'
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    p: 1,
                    width: '100%',
                    height: '100%'
                  }}>
                    {IconComponent && (
                      <IconComponent 
                        sx={{ 
                          fontSize: 24,
                          color: isSelected ? 'white' : '#FD8743',
                          mb: 0.5
                        }} 
                      />
                    )}
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontSize: '0.5rem',
                        textAlign: 'center',
                        color: isSelected ? 'white' : '#666666',
                        lineHeight: 1.1,
                        display: 'block',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {iconOption.name}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Tooltip>
          );
        })}
      </Box>

      {/* no results found message */}
      {filteredIcons.length === 0 && searchTerm && (                                       
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2, fontSize: '0.8rem' }}>
          No {title.toLowerCase()} found matching "{searchTerm}"
        </Typography>
      )}
    </Box>
  );
};

export default IconDropdown;
