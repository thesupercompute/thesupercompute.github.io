import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled, keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedBox = styled(Box)({
  animation: `${fadeIn} 1s ease-in-out`,
});

const Notes = () => {
  return (
    <AnimatedBox mt={5} textAlign="center">
      <Typography variant="h4" gutterBottom>
        Notes Application (Beta)
      </Typography>
      <Typography variant="h6" gutterBottom>
        Efficiently take notes with AI-powered handwriting recognition and math problem solving.
      </Typography>
    </AnimatedBox>
  );
};

export default Notes;
