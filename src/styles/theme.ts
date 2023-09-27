import {Color, Theme} from './type';

const palette: {[key: string]: Color} = {
  white: '#ffffff',
  lightgrey: '#f5f7fb',
  blue: '#2E9DFB',
  green: '#3ddc84',
  red: '#fb6a69',
  grey: '#2F394A',
};

const pastel: {[key: string]: Color} = {
  bluegray: '#809bce',
  iceblue: '#95b8d1',
  aqua: '#b8e0d2',
  lightorange: '#f0d5ba',
  pink: '#eac4d5',
};

export const theme: Theme = {
  colors: {
    background: palette.white,
    foreground: palette.lightgrey,
    primary: palette.blue,
    success: palette.green,
    danger: palette.red,
    text: palette.grey,
    pastel: pastel,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 48,
    xxl: 64,
  },
  textVariants: {
    header: {
      fontFamily: 'Raleway',
      fontSize: 36,
      fontWeight: 'bold',
    },
    body: {
      fontFamily: 'Merriweather',
      fontSize: 16,
    },
  },
};

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.grey,
    text: palette.white,
  },
};
