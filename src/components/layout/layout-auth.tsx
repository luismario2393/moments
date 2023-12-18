import { FC } from "react";
import { Container } from "./style";

interface Props {
  children: React.ReactNode;
  center?: string;
}

const LayoutAuth: FC<Props> = ({ children, center }) => {
  return <Container center={center}>{children}</Container>;
};

export default LayoutAuth;
