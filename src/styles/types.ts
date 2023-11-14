type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgb(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export type Theme = {
  colors: {
    primary: Color;
    secondary: Color;
    background: Color;
    background2: Color;
    success: Color;
    danger: Color;
    highlight: Color;
    highlight2: Color;
    text: Color;
    textDisabled: Color;
  };
  spacing: {
    xs: number;
    s: number;
    m: number;
    b: number;
    l: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
};
