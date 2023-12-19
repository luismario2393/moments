import { FC, ReactNode, useCallback, useMemo, useState } from "react";
import {
  ContainerContent,
  ContainerHeader,
  StyledContent,
  StyledHeader,
  StyledLayout,
  Subtitle,
} from "./style";
import { Layout, Menu, Tooltip, message } from "antd";
const { Sider } = Layout;
import {
  LogoutOutlined,
  HomeOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Logo, LogoLetraWhite } from "..";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const LayoutHome: FC<Props> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isBroken, setIsBroken] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const logout = useCallback(() => {
    try {
      signOut(auth);
      navigate("/login");
    } catch (error) {
      message.error("Error al cerrar sesión");
    }
  }, [auth, navigate]);

  const items = useMemo(
    () => [
      {
        key: "1",
        icon: <HomeOutlined />,
        label: "Inicio",
        onClick: () => {
          navigate("/home");
        },
      },

      {
        key: "3",
        icon: <LogoutOutlined />,
        label: "Cerrar Sesión",
        onClick: () => {
          logout();
        },
      },
    ],
    [logout, navigate]
  );
  return (
    <StyledLayout>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          setIsBroken(broken);
        }}
        onCollapse={(collapsed) => {
          setIsCollapsed(collapsed);
        }}
      >
        <LogoLetraWhite width="150" height="150" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={
            user
              ? items &&
                items.map((item) => {
                  return {
                    ...item,
                    onClick: item.onClick,
                  };
                })
              : []
          }
        />
      </Sider>
      <Layout>
        <StyledHeader collapsed={`${!isCollapsed}`}>
          <ContainerHeader>
            {(isCollapsed || (!isBroken && !isCollapsed)) && (
              <Subtitle>
                Bienvenido <span>{user?.displayName}</span>
              </Subtitle>
            )}
            {user && (
              <Tooltip
                placement="bottom"
                title={"Agregar momento"}
                arrow={true}
              >
                <FileAddOutlined
                  onClick={() => {
                    navigate("/capture");
                  }}
                />
              </Tooltip>
            )}
            {(isCollapsed || (!isBroken && !isCollapsed)) && (
              <Logo width="100" height="50" />
            )}
          </ContainerHeader>
        </StyledHeader>
        <StyledContent>
          <ContainerContent>{children}</ContainerContent>
        </StyledContent>
      </Layout>
    </StyledLayout>
  );
};

export default LayoutHome;
