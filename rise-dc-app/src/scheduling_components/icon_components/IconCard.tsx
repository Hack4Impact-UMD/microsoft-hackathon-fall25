import React, { useState, useMemo } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  TextField,
  Tooltip,
  Card as MuiCard,
  CardActionArea,
  IconButton
} from '@mui/material';

import back from './back.png';

/**
 * IconCard Component
 * 
 * A single grid component that displays all activity icons in one searchable interface.
 * Users can search for specific activities and select them by clicking.
 * Designed for accessibility with large touch targets and clear visual feedback.
 * 
 * Some features:
 * - Single search bar for all icons
 * - Grid layout
 * - Visual selection feedback with orange highlighting
 * - Tooltips for better accessibility
 */

// Import shared icon configuration
import { iconList } from './iconConfig';
import { Search } from '@mui/icons-material';


/**
 * Props interface for IconCard component
 */
interface IconCardProps {
  /** Callback function called when an icon is selected */
  onIconSelect?: (category: string, iconName: string, iconType: string) => void;
  /** Callback function called when back button is clicked */
  onBackClick?: () => void;
}

const IconCard: React.FC<IconCardProps> = ({ onIconSelect, onBackClick }) => {
  // search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // state to track selected icon (only one can be selected at a time)
  const [selectedIcon, setSelectedIcon] = useState<{name: string, icon: React.ComponentType<any>} | null>(null);

  // icon selection logic
  const handleIconSelect = (iconOption: any) => {
    setSelectedIcon({
      name: iconOption.name, 
      icon: iconOption.icon
    });
    // call parent callback to update IconButton and close popup
    if (onIconSelect) {
      onIconSelect('activities', iconOption.name, iconOption.icon.name);
    }
  };

  /**
   * filter icons based on search term
   */
  const filteredIcons = useMemo(() => {
    if (!searchTerm) return iconList;
    return iconList.filter(icon => 
      icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);


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
      <CardContent sx={{ p: 3, pt: 8, position: 'relative' }}>
        {/* Back Arrow */}
        <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
          <IconButton 
            onClick={onBackClick}
            sx={{ 
              p: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <Box
              component="img"
              src={back}
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
            const IconComponent = iconOption.icon;
            
            return (
              <Tooltip key={iconOption.name} title={iconOption.name} placement="top">
                <MuiCard 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: 1,
                    borderColor: '#E0E0E0',
                    backgroundColor: 'white',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 2,
                      borderColor: '#FD8743'
                    }
                  }}
                >
                  <CardActionArea 
                    onClick={() => handleIconSelect(iconOption)}
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
                            color: '#FD8743',
                            mb: 1
                          }} 
                        />
                      )}
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontSize: '0.6rem',
                          textAlign: 'center',
                        color: '#666666',
                        lineHeight: 1.1,
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
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                  No icons found matching "{searchTerm}"
                </Typography>
              </Box>
            )}

      </CardContent>
    </Card>
  );
};

export default IconCard;