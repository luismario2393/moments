import { Form, Upload, UploadProps, message } from "antd";
import { ContainerButtons, ContainerVideo } from "./style";
import { useMemo, useState } from "react";
import {
  CloseOutlined,
  StepBackwardOutlined,
  LoadingOutlined,
  PlusOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import firebase from "../../firebase";
import ButtonCapture from "./components/button-capture";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { IInfoForm } from "../../state/interfaces/IInfoForm";
import { Button, CustomLink, Input } from "../../components";
import { ButtonType, InputTypes } from "../../state/emun";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { beforeUpload } from "../../utils";
import { useAuth } from "../../firebase/store";

const Share = () => {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const db = firebase.firestore;
  const auth = useAuth((state) => state.auth);
  const user = auth.currentUser;
  const buttonCap = useMemo(
    () => [
      {
        icon: <CameraOutlined />,
        onClick: () => {
          navigate("/capture");
        },
        show: !photo,
        titleTooltip: "Volver a tomar foto",
      },
      {
        icon: <CloseOutlined />,
        onClick: () => {
          setPhoto(null);
          form.resetFields();
        },
        show: !!photo,
        titleTooltip: "Cancelar foto",
      },

      {
        icon: <StepBackwardOutlined />,
        onClick: () => navigate("/home"),
        show: true,
        titleTooltip: "Regresar al inicio",
      },
    ],
    [navigate, photo, form]
  );

  const onSubmit = async (values: IInfoForm) => {
    try {
      setLoading(true);

      const timestamp = serverTimestamp();
      await addDoc(collection(db, "moments"), {
        photoUser: user?.photoURL,
        userIds: user?.uid,
        userName: user?.displayName,
        description: values.description,
        photo,
        createAt: timestamp,
        updateAt: timestamp,
        likes: [],
        shared: [],
      });
      message.success("Momento subido con éxito");
      navigate("/home");
      setLoading(false);
    } catch (e) {
      message.error("Error al subir el momento");
    }
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

      setPhoto(getFiles);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Sube tu foto</div>
    </div>
  );

  return (
    <ContainerVideo>
      {user ? (
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
            {photo ? (
              <img src={photo} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
          <ContainerButtons>
            {buttonCap.map(({ icon, onClick, show, titleTooltip }) => (
              <ButtonCapture
                key={`button-${Math.random().toString(36)}`}
                onClick={onClick}
                show={show}
                titleTooltip={titleTooltip}
              >
                {icon}
              </ButtonCapture>
            ))}
          </ContainerButtons>
          <Input
            type={InputTypes.text}
            id="input-description"
            name={"description"}
            label={"Descripción"}
            placeholder={"Agrega una pequeñá descripción"}
            value={form.getFieldValue("description")}
            autoComplete="username"
          />

          <Button
            customType={ButtonType.primary}
            htmlType="submit"
            style={{ marginTop: "8px" }}
            disabled={loading}
          >
            {loading ? <LoadingOutlined /> : "Agregar foto"}
          </Button>
        </Form>
      ) : (
        <CustomLink to={"/login"}>Debes iniciar sesión</CustomLink>
      )}
    </ContainerVideo>
  );
};

export default Share;
