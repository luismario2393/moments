import { getAuth, signOut } from "firebase/auth";
import { UserOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState, useMemo, useCallback } from "react";
import { Logo, LogoLetraWhite } from "../../components";
import {
  ContainerContent,
  StyledContent,
  StyledHeader,
  StyledLayout,
  Title,
} from "./style";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;
  console.log({ user });
  const logout = useCallback(() => {
    try {
      signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
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
        key: "2",
        icon: <UserOutlined />,
        label: "Perfil",
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
            items &&
            items.map((item) => {
              return {
                ...item,
                onClick: item.onClick,
              };
            })
          }
        />
      </Sider>
      <Layout>
        <StyledHeader>
          {isBroken && isCollapsed ? (
            <Logo width="100" height="50" />
          ) : (
            <Title>MOMENTS </Title>
          )}
        </StyledHeader>
        <StyledContent>
          <ContainerContent></ContainerContent>
        </StyledContent>
      </Layout>
    </StyledLayout>
  );
};

export default Home;
