import { FC, ReactNode } from "react";
import { StyledLink } from "./style";

interface Props {
  to: string;
  children: ReactNode;
}

const CustomLink: FC<Props> = ({ to, children }) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

export default CustomLink;
