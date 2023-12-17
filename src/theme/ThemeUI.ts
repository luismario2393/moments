import { IMultiplesTheme, ITheme } from "../state/interfaces/ITheme";
import { fontSizes } from "./base/variables";

const defaultTheme: ITheme = {
  brand: {
    primaryMain: "#D9E6E1",
  },
  platform: {
    black: "#2A2A33",
    grayscalePlaceholders: "#77787E",
    grayscaleBorders: "#DDE2ED",
    grayscaleBackgrounds: "#EFF2F9",
    grayFocused: "#C3C5CC",
    greenMain: "#40CD87",
    greenLight: "#F3F9F6",
    redMain: "#ED6868",
    redLight: "#FAF2F1",
    yellowDark: "#EBC40E",
    yellowLight: "#F7F5ED",
    white: "#ffffff",
    veryLightGray: "#fafafa",
    lightGrayishBlue: "#e2e3ea",
    blueMain: "#1358B4",
    blueDark: "#104489",
  },
  fontSizes,
};

export const theme: IMultiplesTheme = {
  default: defaultTheme,
};
