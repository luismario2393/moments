import {} from "styled-components";
import { ITheme } from "../state/interfaces/ITheme";

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}
