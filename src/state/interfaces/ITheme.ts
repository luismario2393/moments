export interface ITheme {
  brand: {
    primaryMain: string;
  };
  platform: {
    black: string;
    grayscalePlaceholders: string;
    grayscaleBorders: string;
    grayscaleBackgrounds: string;
    grayFocused: string;
    greenMain: string;
    greenLight: string;
    redMain: string;
    redLight: string;
    yellowDark: string;
    yellowLight: string;
    white: string;
    veryLightGray: string;
    lightGrayishBlue: string;
    blueMain: string;
    blueDark: string;
  };

  fontSizes: {
    mainSize: string;
    secondsize: string;
  };
}

export interface IMultiplesTheme {
  default: ITheme;
}
