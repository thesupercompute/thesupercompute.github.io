import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import './Layout.css';
import AnimatedBackground from './AnimatedBackground';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d47a1',
    },
    secondary: {
      main: '#ffab00',
    },
  },
  typography: {
    fontFamily: "'Roboto Mono', monospace",
  },
});

const Background = styled('div')({
  position: 'relative',
  minHeight: '100vh',
  padding: '20px 0',
  color: '#fff',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #6a11cb, #770909)',
});

const Logo = styled(Typography)({
  fontFamily: "'Orbitron', sans-serif",
  letterSpacing: '2px',
});

const Layout = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
          <Background>
            <AnimatedBackground />
            <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
              <Toolbar>
                <Logo className="text-element" variant="h4" style={{ flexGrow: 1 }}>
                  TheSuperCompute
                </Logo>
                <Button className="text-element" color="inherit" href="/">Home</Button>
                <Button className="text-element" color="inherit" href="#/notes">Notes</Button>
              </Toolbar>
            </AppBar>
            <Container>
              {children}
            </Container>
            <Box className="text-element" component="footer" mt={5} py={3} textAlign="center">
              <Typography variant="body2" color="textSecondary">
                © 2024 TheSuperCompute
              </Typography>
            </Box>
          </Background>
        </ThemeProvider>
      );
};

export default Layout;
