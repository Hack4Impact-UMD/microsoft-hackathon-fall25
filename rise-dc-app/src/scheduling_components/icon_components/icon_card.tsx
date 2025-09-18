import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Paper,
  Collapse,
  IconButton
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import IconDropdown from './IconDropdown';

/**
 * IconCard Component
 * 
 * A collapsible card component that displays different activity categories
 * (hobbies, chores, skills, hygiene) in a vertical stack. Each category can be
 * expanded/collapsed to show/hide the icon selection interface.
 * 
 * Features:
 * - Collapsible categories for better mobile UX
 * - Visual feedback with expand/collapse icons
 * - Selected activities summary display
 * - Orange and grey color scheme for accessibility
 */
/**
 * Icon Categories Configuration
 * 
 * Defines the four main activity categories with their respective icons.
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
 * Props interface for IconCard component
 */
interface IconCardProps {
  /** Callback function called when an icon is selected */
  onIconSelect?: (category: string, iconName: string, iconType: string) => void;
}

const IconCard: React.FC<IconCardProps> = ({ onIconSelect }) => {
  // State to track which icons are selected in each category
  const [selectedIcons, setSelectedIcons] = useState<{[key: string]: string}>({});
  
  // State to track which categories are expanded/collapsed
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({});

  /**
   * Handles icon selection from child IconDropdown components
   * @param category - The category key (hobbies, chores, skills, hygiene)
   * @param iconName - The name of the selected activity
   * @param iconType - The MUI icon type
   */
  const handleIconSelect = (category: string, iconName: string, iconType: string) => {
    // Update local state with selected icon
    setSelectedIcons(prev => ({
      ...prev,
      [category]: iconName
    }));
    
    // Call parent callback if provided
    if (onIconSelect) {
      onIconSelect(category, iconName, iconType);
    }
  };

  /**
   * Toggles the expanded/collapsed state of a category
   * 
   * This function handles the click events on category headers to expand/collapse
   * the icon selection interface. It uses a functional state update to toggle
   * the boolean value for the specific category.
   * 
   * @param categoryKey - The category key to toggle (hobbies, chores, skills, hygiene)
   * 
   * How it works:
   * 1. Takes the current expandedCategories state
   * 2. Spreads all existing category states (...prev)
   * 3. Toggles the specific category's boolean value (!prev[categoryKey])
   * 4. Updates the state with the new object
   */
  const handleCategoryToggle = (categoryKey: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]  // Toggle: true becomes false, false becomes true
    }));
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 500, 
        margin: 'auto', 
        marginTop: 3,
        boxShadow: 3,
        borderRadius: 2
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography 
          variant="h5" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            fontWeight: 'bold',
            color: '#FD8743',
            mb: 3,
            fontFamily: 'Lexend, sans-serif'
          }}
        >
          Activity Icon Selector
        </Typography>
        
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          {/* Render each category as a collapsible section */}
          {Object.entries(iconCategories).map(([categoryKey, category]) => (
            <Paper 
              key={categoryKey}
              elevation={2} 
              sx={{ 
                borderRadius: 2,
                backgroundColor: '#F5F5F5',
                overflow: 'hidden'  // Ensures content doesn't overflow rounded corners
              }}
            >
              {/* Clickable header that toggles collapse state */}
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  cursor: 'pointer',  // Shows hand cursor on hover
                  '&:hover': {
                    backgroundColor: '#EEEEEE'  // Visual feedback on hover
                  }
                }}
                onClick={() => handleCategoryToggle(categoryKey)}  // Toggle collapse on click
              >
                {/* Category title */}
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: '#666666',
                    fontFamily: 'Lexend, sans-serif'
                  }}
                >
                  {category.title}
                </Typography>
                
                {/* expand/collapse icon that changes based on state */}
                <IconButton size="small">
                  {expandedCategories[categoryKey] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
              
              {/* Collapsible content area */}
              <Collapse in={expandedCategories[categoryKey]}>
                <Box sx={{ p: 2, pt: 0 }}>
                  <IconDropdown
                    category={categoryKey}
                    title={category.title}
                    icons={category.icons}
                    selectedIcon={selectedIcons[categoryKey]}
                    onIconSelect={handleIconSelect}
                  />
                </Box>
              </Collapse>
            </Paper>
          ))}
        </Box>

      </CardContent>
    </Card>
  );
};

export default IconCard;
