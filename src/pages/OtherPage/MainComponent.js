import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const steps = [
  'Select your problem',
  'Select your solutions',
  'Tell us about your budget',
  'Purchase your solutions',
  'Complete your order'
];

const MainComponent = () => {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <Box p={3}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box display="flex" mt={3}>
        <Box flex={1}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              Test Cases
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Test Case 1: Description for step 1" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Test Case 2: Description for step 2" />
              </ListItem>
            </List>
          </Paper>
        </Box>
        <Box flex={1}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              Checklist
            </Typography>
            <List>
              {steps.map((label, index) => (
                <ListItem key={label}>
                  <ListItemText primary={`${index + 1}. ${label}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default MainComponent;
