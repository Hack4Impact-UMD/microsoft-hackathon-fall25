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
// Define icon categories with their respective icons
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

interface IconCardProps {
  onIconSelect?: (category: string, iconName: string, iconType: string) => void;
}

const IconCard: React.FC<IconCardProps> = ({ onIconSelect }) => {
  const [selectedIcons, setSelectedIcons] = useState<{[key: string]: string}>({});
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({});

  const handleIconSelect = (category: string, iconName: string, iconType: string) => {
    setSelectedIcons(prev => ({
      ...prev,
      [category]: iconName
    }));
    
    if (onIconSelect) {
      onIconSelect(category, iconName, iconType);
    }
  };

  const handleCategoryToggle = (categoryKey: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
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
          {Object.entries(iconCategories).map(([categoryKey, category]) => (
            <Paper 
              key={categoryKey}
              elevation={2} 
              sx={{ 
                borderRadius: 2,
                backgroundColor: '#F5F5F5',
                overflow: 'hidden'
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#EEEEEE'
                  }
                }}
                onClick={() => handleCategoryToggle(categoryKey)}
              >
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
                
                <IconButton size="small">
                  {expandedCategories[categoryKey] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
              
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

        {/* Selected Icons Summary */}
        {Object.keys(selectedIcons).length > 0 && (
          <Box sx={{ mt: 3, p: 3, backgroundColor: '#FD8743', borderRadius: 2 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: 'white', fontFamily: 'Lexend, sans-serif' }}>
              Selected Activities:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {Object.entries(selectedIcons).map(([category, iconName]) => (
                <Typography 
                  key={category}
                  variant="body2" 
                  sx={{ 
                    backgroundColor: 'white',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    color: '#666666',
                    fontFamily: 'Neue Haas Grotesk Display Pro, sans-serif'
                  }}
                >
                  {iconCategories[category as keyof typeof iconCategories]?.title}: {iconName}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default IconCard;
