import { createTheme } from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation';

declare module '@mui/material/styles' {
  interface Palette {
    dark: Palette['primary'];
    light: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    dark?: PaletteOptions['primary'];
    light?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    dark: true;
    light: true;
  }
}

declare module '@mui/material/Input' {
  interface InputBasePropsColorOverrides {
    dark: true;
    light: true;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    dark: true;
    light: true;
  }
}

declare module '@mui/material/FormControl' {
  interface FormControlPropsColorOverrides {
    dark: true;
    light: true;
  }
}

export const theme = createTheme({
  palette: {
    dark: {
      main: '#212121',
      contrastText: '#fff',
    },
    light: {
      main: '#ced4da',
      contrastText: 'black',
    },
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#212121',
    },
  },
  typography: {
    fontFamily: [
      'Nunito',
      'Roboto',
      'sans-serif',
      'IBM Plex Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Helvetica Neue',
      'Arial',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
    ].join(','),
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiSnackbar: {
      defaultProps: {
        autoHideDuration: 5000,
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
        },
      },
    },
  },
});
