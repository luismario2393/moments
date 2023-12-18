import styled from "styled-components";
import { Layout } from "antd";
const { Content, Header } = Layout;

interface IContainer {
  children: React.ReactNode;
  center?: string;
}

export const Container = styled.div<IContainer>`
  margin: 0 auto;
  max-width: 700px;
  ${({ center }) =>
    center === "true" &&
    `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`;

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

export const Subtitle = styled.span`
  font-family: "Lexend";
  color: ${({ theme }) => theme.brand.primaryDark};
  text-align: center;
  margin: 0 0 0 12px;
  span {
    font-weight: bold;
  }
`;
export const ContainerContent = styled.h1`
  padding: 24;
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;
`;

export const StyledContent = styled(Content)`
  max-height: 100vh;
  margin: 24px 16px 0;
  overflow: scroll;
`;

interface IHeader {
  collapsed: string;
}

export const StyledHeader = styled(Header)<IHeader>`
  padding: 0;
  background: ${({ theme }) => theme.platform.white};

  @media (max-width: 768px) {
    ${({ collapsed }) =>
      collapsed === "true" &&
      `
  display: flex;
  justify-content: center;
  align-items: center;
  
  `};
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .anticon-file-add {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: ${({ theme }) => theme.brand.primaryDark};
    cursor: pointer;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.platform.black};
      transition: color 0.3s ease-in-out;
    }
  }
`;
