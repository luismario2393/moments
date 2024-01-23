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
import { Divider, Form, Tooltip, Upload, message } from "antd";
import { IInfoForm } from "../../state/interfaces/IInfoForm";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import { useState } from "react";
import {
  LoadingOutlined,
  PlusOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { beforeUpload } from "../../utils";
import { useAuth } from "../../firebase/store";

const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [urlPhoto, setUrlPhoto] = useState<string>();
  const navigate = useNavigate();
  const auth = useAuth((state) => state.auth);
  const onSubmit = (values: IInfoForm) => {
    createUserWithEmailAndPassword(
      auth,
      values.email ?? "",
      values.password ?? ""
    )
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: values.name ?? "",
          photoURL: urlPhoto,
        }).then(() => {
          form.resetFields();
          messageApi.success({
            type: "success",
            content: "Registro exitoso",
          });
          navigate("/home");
        });
      })
      .catch(() => {
        messageApi.error({
          type: "error",
          content: "Error al registrarse intente de nuevo",
        });
      });
  };

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    const storage = getStorage();
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);

      const storageRef = ref(storage, `users/${info.file.name}-${Date.now()}}`);

      await uploadBytes(storageRef, info.file.originFileObj as Blob);
      const getFiles = await getDownloadURL(storageRef);

      setUrlPhoto(getFiles);
    }
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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Sube tu foto</div>
    </div>
  );

  return (
    <LayoutAuth center={"true"}>
      {contextHolder}
      <LogoLetra width="200" height="200" />
      <Divider />
      <CustomTypography type={TypographyType.HeadlineH2} text={"Regístrate"} />

      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete="on"
      >
        <Upload
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {urlPhoto ? (
            <img src={urlPhoto} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
        <Input
          type={InputTypes.text}
          id="input-name"
          name={"name"}
          label={"Nombre"}
          placeholder={"Escribe tu nombre"}
          required={true}
          error={"El nombre es requerido"}
          value={form.getFieldValue("name")}
          autoComplete="username"
        />

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
          Regístrate
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
        <CustomLink to={"/login"}>Inicia sesión</CustomLink>
      </ContainerLink>
    </LayoutAuth>
  );
};

export default Register;
