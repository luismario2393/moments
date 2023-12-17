import { FC } from "react";
import { Container } from "./style";

interface Props {
  children: React.ReactNode;
  center?: string;
}

const Layout: FC<Props> = ({ children, center }) => {
  return <Container center={center}>{children}</Container>;
};

export default Layout;
