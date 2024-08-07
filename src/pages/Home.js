import React from 'react';
import { Typography, Box, Button } from '@mui/material';
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

const Home = () => {
  return (
    <AnimatedBox mt={5} textAlign="center">
      <Typography variant="h2" gutterBottom>
        Welcome to TheSuperCompute
      </Typography>
      <Typography variant="h5" gutterBottom>
        Leveraging AI to create products that make sense and make people's lives easier.
      </Typography>
      <Box mt={3}>
        <Button variant="contained" color="primary" href="/notes">
          Explore Our Notes App
        </Button>
      </Box>
    </AnimatedBox>
  );
};

export default Home;
