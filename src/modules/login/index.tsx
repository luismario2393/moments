import {
  Button,
  Input,
  LayoutAuth,
  LogoLetra,
  Typography as CustomTypography,
  CustomLink,
} from "../../components";
import { ContainerLink } from "../../components/common";
import { ButtonType, InputTypes, TypographyType } from "../../state/emun";
import { Divider, Form, Tooltip, message } from "antd";
import { IInfoForm } from "../../state/interfaces/IInfoForm";
import { GoogleOutlined } from "@ant-design/icons";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase/store";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const auth = useAuth((state) => state.auth);

  const onSubmit = (values: IInfoForm) => {
    signInWithEmailAndPassword(auth, values.email ?? "", values.password ?? "")
      .then((userCredential) => {
        const user = userCredential.user;

        form.resetFields();
        messageApi.success({
          type: "success",
          content: `Bienvenido ${user?.displayName}` ?? "Bienvenidos",
        });
        navigate("/home");
      })
      .catch(() => {
        messageApi.error({
          type: "error",
          content:
            "Error al iniciar sesión intente de nuevo, tu correo o contraseña son incorrectos",
        });
      });
  };

  const handleGoogleSignIn = async () => {
    const authProvider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, authProvider);

      messageApi.success({
        type: "success",
        content: "Inicio de sesión exitoso con Google",
      });

      navigate("/home");
    } catch (error) {
      messageApi.error({
        type: "error",
        content: "Error al iniciar sesión con Google. Intente de nuevo",
      });
    }
  };

  return (
    <LayoutAuth center={"true"}>
      {contextHolder}
      <LogoLetra width="200" height="200" />
      <Divider />
      <CustomTypography
        type={TypographyType.HeadlineH2}
        text={"Inicia sesión"}
      />

      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete="on"
      >
        <Input
          type={InputTypes.email}
          id="input-email"
          name={"email"}
          label={"Correo electrónico"}
          placeholder={"Escribe tu correo electrónico"}
          required={true}
          error={"El correo electrónico es requerido"}
          value={form.getFieldValue("email")}
          autoComplete="username"
        />

        <Input
          type={InputTypes.password}
          id="input-password"
          name={"password"}
          label={"Contraseña"}
          placeholder={"Escribe tu contraseña"}
          required={true}
          error={"La contraseña es requerida"}
          value={form.getFieldValue("password")}
          autoComplete="current-password"
        />

        <Divider />

        <Button customType={ButtonType.primary} htmlType="submit">
          Inicia sesión
        </Button>
      </Form>

      <ContainerLink>
        <Tooltip
          placement="top"
          title={"Inicia sesión con google"}
          arrow={true}
        >
          <Button
            customType={ButtonType.secondary}
            onClick={handleGoogleSignIn}
            style={{ marginBottom: 16 }}
          >
            <GoogleOutlined />
          </Button>
        </Tooltip>
        <CustomLink to={"/register"}>Crea una cuenta</CustomLink>
      </ContainerLink>
    </LayoutAuth>
  );
};

export default Login;
