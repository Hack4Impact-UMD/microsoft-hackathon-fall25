import React, { useState, useMemo } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  TextField,
  Chip,
  Tooltip,
  Card as MuiCard,
  CardActionArea,
  IconButton
} from '@mui/material';

/**
 * IconCard Component
 * 
 * A single grid component that displays all activity icons in one searchable interface.
 * Users can search for specific activities and select them by clicking.
 * Designed for accessibility with large touch targets and clear visual feedback.
 * 
 * Features:
 * - Single search bar for all icons
 * - Large responsive grid layout
 * - Visual selection feedback with orange highlighting
 * - Tooltips for better accessibility
 * - Orange and grey color scheme for accessibility
 */

// Import all the icons we need
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
  Medication,
  Search
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

/**
 * Icon Categories Configuration
 * 
 * Defines all activity categories with their respective icons.
 * Each category contains a title and an array of icon objects with name and MUI icon type.
 */
const iconCategories = {
  hobbies: {
    title: 'Hobbies',
    icons: [
      { name: 'Sports', icon: 'SportsSoccer' },
      { name: 'Reading', icon: 'MenuBook' },
      { name: 'Music', icon: 'MusicNote' },
      { name: 'Art', icon: 'Palette' },
      { name: 'Gaming', icon: 'SportsEsports' },
      { name: 'Photography', icon: 'CameraAlt' },
      { name: 'Cooking', icon: 'Restaurant' },
      { name: 'Gardening', icon: 'LocalFlorist' }
    ]
  },
  chores: {
    title: 'Chores',
    icons: [
      { name: 'Cleaning', icon: 'CleaningServices' },
      { name: 'Laundry', icon: 'LocalLaundryService' },
      { name: 'Dishes', icon: 'DinnerDining' },
      { name: 'Vacuum', icon: 'CleaningServices' },
      { name: 'Trash', icon: 'Delete' },
      { name: 'Shopping', icon: 'ShoppingCart' },
      { name: 'Organize', icon: 'Inventory' },
      { name: 'Maintenance', icon: 'Build' }
    ]
  },
  skills: {
    title: 'Skills',
    icons: [
      { name: 'Coding', icon: 'Code' },
      { name: 'Design', icon: 'DesignServices' },
      { name: 'Writing', icon: 'Edit' },
      { name: 'Language', icon: 'Translate' },
      { name: 'Math', icon: 'Calculate' },
      { name: 'Science', icon: 'Science' },
      { name: 'Presentation', icon: 'PresentToAll' },
      { name: 'Leadership', icon: 'Group' }
    ]
  },
  hygiene: {
    title: 'Hygiene',
    icons: [
      { name: 'Shower', icon: 'Shower' },
      { name: 'Brush Teeth', icon: 'CleaningServices' },
      { name: 'Skincare', icon: 'Face' },
      { name: 'Hair Care', icon: 'ContentCut' },
      { name: 'Exercise', icon: 'FitnessCenter' },
      { name: 'Meditation', icon: 'Psychology' },
      { name: 'Sleep', icon: 'Bedtime' },
      { name: 'Vitamins', icon: 'Medication' }
    ]
  }
};

/**
 * Interface for individual icon options
 */
interface IconOption {
  /** Display name of the activity */
  name: string;
  /** MUI icon component name */
  icon: string;
  /** Category the icon belongs to */
  category: string;
}

/**
 * Props interface for IconCard component
 */
interface IconCardProps {
  /** Callback function called when an icon is selected */
  onIconSelect?: (category: string, iconName: string, iconType: string) => void;
}

const IconCard: React.FC<IconCardProps> = ({ onIconSelect }) => {
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  
  // State to track selected icon (only one can be selected at a time)
  const [selectedIcon, setSelectedIcon] = useState<{category: string, name: string, icon: string} | null>(null);

  /**
   * Flatten all icons from all categories into a single array
   * Each icon gets a category property for identification
   */
  const allIcons: IconOption[] = useMemo(() => {
    const flattened: IconOption[] = [];
    Object.entries(iconCategories).forEach(([categoryKey, category]) => {
      category.icons.forEach(icon => {
        flattened.push({
          ...icon,
          category: categoryKey
        });
      });
    });
    return flattened;
  }, []);

  /**
   * Filter icons based on search term
   * Uses useMemo for performance optimization
   */
  const filteredIcons = useMemo(() => {
    if (!searchTerm) return allIcons;
    return allIcons.filter(icon => 
      icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iconCategories[icon.category as keyof typeof iconCategories].title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allIcons, searchTerm]);

  /**
   * Handles icon selection when user clicks on an icon
   * Only one icon can be selected at a time across all categories
   * @param iconOption - The selected icon option
   */
  const handleIconClick = (iconOption: IconOption) => {
    // If clicking the same icon, deselect it
    if (selectedIcon && 
        selectedIcon.category === iconOption.category && 
        selectedIcon.name === iconOption.name) {
      setSelectedIcon(null);
      return;
    }
    
    // Select the new icon (replaces any previously selected icon)
    setSelectedIcon({
      category: iconOption.category,
      name: iconOption.name,
      icon: iconOption.icon
    });
    
    // Call parent callback if provided
    if (onIconSelect) {
      onIconSelect(iconOption.category, iconOption.name, iconOption.icon);
    }
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 600, 
        margin: 'auto', 
        marginTop: 3,
        boxShadow: 3,
        borderRadius: 2,
        color: '#F9FAFB',
        fontFamily: 'Lexend, sans-serif',
        '& *': {
          fontFamily: 'Lexend, sans-serif !important'
        }
      }}
    >
      {/* TODO: implement back arrow logic */}
      <CardContent sx={{ p: 3, pt: 8, position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
          <IconButton 
            sx={{ 
              p: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <img 
              src="/src/scheduling_components/icon_components/back.png" 
              alt="Back" 
              style={{ 
                width: '2.3rem', 
                height: '2.3rem',
                cursor: 'pointer'
              }} 
            />
          </IconButton>
        </Box>

        <Typography 
          variant="h5" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            color: '#0C343D',
            mb: 2,
            fontWeight: 400,
            size: '32px'
          }}
        >
          Pick an Icon
        </Typography>
        
        {/* Search Field */}
        <TextField
          fullWidth
          size="medium"
          placeholder="Type to Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: <Search sx={{ color: '#8C8C8C'}} />
            }
          }}
          sx={{ 
            mb: 3,
            '& .MuiInputBase-input': {
              fontSize: '1rem',
              padding: '16px 14px',
                '&::placeholder': {
                  fontSize: '1.2rem',
                  color: '#8C8C8C',
                  fontWeight: 300,
                  opacity: 1
                }
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FD8743',
                borderWidth: 2
              }
            }
          }}
        />

        {/* Selected Icon Display */}
        {selectedIcon && (
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 'bold',
                color: '#666666',
                mb: 1
              }}
            >
              Selected Activity:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Tooltip title={`${iconCategories[selectedIcon.category as keyof typeof iconCategories].title}: ${selectedIcon.name}`}>
                <Chip
                  icon={iconMap[selectedIcon.icon] ? React.createElement(iconMap[selectedIcon.icon]) : undefined}
                  label={selectedIcon.name}
                  variant="filled"
                  sx={{ 
                    backgroundColor: '#FD8743', 
                    color: 'white',
                    fontSize: '0.8rem',
                    height: '32px',
                    '& .MuiChip-icon': {
                      fontSize: '1.1rem'
                    }
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
        )}

        {/* Icon Grid */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 2,
          maxHeight: '500px',
          overflowY: 'auto',
          p: 2,
          borderRadius: 2,
          backgroundColor: 'white'
        }}>
          {filteredIcons.map((iconOption) => {
            const IconComponent = iconMap[iconOption.icon];
            const isSelected = selectedIcon && 
                              selectedIcon.category === iconOption.category && 
                              selectedIcon.name === iconOption.name;
            
            return (
              <Tooltip key={`${iconOption.category}-${iconOption.name}`} title={`${iconCategories[iconOption.category as keyof typeof iconCategories].title}: ${iconOption.name}`} placement="top">
                <MuiCard 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    border: isSelected ? 2 : 1,
                    borderColor: isSelected ? '#FD8743' : '#E0E0E0',
                    backgroundColor: isSelected ? '#FD8743' : 'white',
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
                      p: 2, 
                      minHeight: '100px', 
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
                      width: '100%',
                      height: '100%'
                    }}>
                      {IconComponent && (
                        <IconComponent 
                          sx={{ 
                            fontSize: 32,
                            color: isSelected ? 'white' : '#FD8743',
                            mb: 1
                          }} 
                        />
                      )}
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontSize: '0.7rem',
                          textAlign: 'center',
                        color: isSelected ? 'white' : '#666666',
                        lineHeight: 1.2,
                        display: 'block',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                        }}
                      >
                        {iconOption.name}
                      </Typography>
                    </Box>
                  </CardActionArea>
                </MuiCard>
              </Tooltip>
            );
          })}
        </Box>

        {/* No results message */}
        {filteredIcons.length === 0 && searchTerm && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2, fontSize: '0.9rem' }}>
            No activities found matching "{searchTerm}"
          </Typography>
        )}

      </CardContent>
    </Card>
  );
};

export default IconCard;