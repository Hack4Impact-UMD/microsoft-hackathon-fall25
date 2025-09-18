import { Box, Typography, Container } from '@mui/material';
import IconCard from '../scheduling_components/icon_components/icon_card';

// filler logic for now 
export default function Scheduler() {
  const handleIconSelect = (category: string, iconName: string, iconType: string) => {
    console.log(`Selected ${category}: ${iconName} (${iconType})`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Visual Scheduling & Daily Routines
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Select activities to create your personalized schedule
        </Typography>
      </Box>
      
      <IconCard onIconSelect={handleIconSelect} />
    </Container>
  );
}