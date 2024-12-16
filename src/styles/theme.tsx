import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ff7336'
    },
  },
  typography: {
    fontFamily: [
      'Moneygraphy-Rounded',
    ].join(',')
  }
});
