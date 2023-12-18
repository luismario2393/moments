import styled from "styled-components";
import { Layout } from "antd";
const { Content, Header } = Layout;

export const StyledLayout = styled(Layout)`
  height: 100vh;
  .ant-layout-sider {
    background: ${({ theme }) => theme.brand.primaryDark};
  }
  .ant-menu {
    background: ${({ theme }) => theme.brand.primaryDark};
  }
  .ant-layout-sider-zero-width-trigger {
    background: ${({ theme }) => theme.brand.primaryDark};
  }
  .ant-menu-item-selected {
    background: ${({ theme }) => theme.brand.secondaryMain};
  }
`;

export const Title = styled.h1`
  font-family: "Lexend";
  color: ${({ theme }) => theme.brand.primaryDark};
  text-align: center;
  margin-top: 0;
`;
export const ContainerContent = styled.h1`
  padding: 24;
  height: 80%;
  background: ${({ theme }) => theme.platform.white};
  border-radius: 4px;
`;

export const StyledContent = styled(Content)`
  max-height: 100vh;
  margin: 24px 16px 0;
  overflow: scroll;
`;

export const StyledHeader = styled(Header)`
  padding: 0;
  background: ${({ theme }) => theme.platform.white};
`;
