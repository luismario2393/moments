import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import {
  CameraOutlined,
  CloseOutlined,
  UploadOutlined,
  StepBackwardOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Video, ContainerButtons, ContainerVideo } from "./style";

import ButtonCapture from "./components/button-capture";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { ButtonType, InputTypes } from "../../state/emun";
import { IInfoForm } from "../../state/interfaces/IInfoForm";
import { Button, CustomLink, Input } from "../../components";
import firebase from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "../../firebase/store";

const Capture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const db = firebase.firestore;
  const auth = useAuth((state) => state.auth);
  const user = auth.currentUser;

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      message.error("Error al acceder a la cámara");
    }
  }, [videoRef]);

  useEffect(() => {
    startCamera();
  }, [startCamera]);

  const takePhoto = async () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const canvasWidth = 330;
      const canvasHeight = 200;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const context = canvas.getContext("2d");

      if (context) {
        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;

        const scaleX = canvasWidth / videoWidth;
        const scaleY = canvasHeight / videoHeight;
        const scale = Math.min(scaleX, scaleY);

        const drawWidth = videoWidth * scale;
        const drawHeight = videoHeight * scale;

        const drawX = (canvasWidth - drawWidth) / 2;
        const drawY = (canvasHeight - drawHeight) / 2;

        context.drawImage(
          videoRef.current,
          drawX,
          drawY,
          drawWidth,
          drawHeight
        );

        const dataURL = canvas.toDataURL("image/png");
        setPhoto(dataURL);
      }
    }
  };

  const uploadPhoto = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, `moments/-${Date.now()}.png`);
    const data = photo?.split(",")[1];

    const bytes = new Uint8Array(
      atob(data ?? "")
        .split("")
        .map((char) => char.charCodeAt(0))
    );
    const imageBlob = new Blob([bytes], { type: "image/png" });

    try {
      await uploadBytes(storageRef, imageBlob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      message.error("Error al subir la foto");
    }
  };

  const buttonCap = useMemo(
    () => [
      {
        icon: <CameraOutlined />,
        onClick: takePhoto,
        show: !photo,
        titleTooltip: "Tomar foto",
      },
      {
        icon: <CloseOutlined />,
        onClick: () => {
          setPhoto(null);
          startCamera();
          form.resetFields();
        },
        show: !!photo,
        titleTooltip: "Cancelar foto",
      },
      {
        icon: <UploadOutlined />,
        onClick: () => navigate("/share"),
        show: !photo,
        titleTooltip: "Subir foto",
      },
      {
        icon: <StepBackwardOutlined />,
        onClick: () => navigate("/home"),
        show: true,
        titleTooltip: "Regresar",
      },
    ],
    [navigate, startCamera, photo, form]
  );

  const onSubmit = async (values: IInfoForm) => {
    try {
      setLoading(true);
      const photo = await uploadPhoto();
      const timestamp = serverTimestamp();
      await addDoc(collection(db, "moments"), {
        photoUser: user?.photoURL,
        userId: user?.uid,
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

  return (
    <ContainerVideo>
      {user ? (
        <>
          {photo ? (
            <img src={photo} alt="Captured" />
          ) : (
            <Video ref={videoRef} autoPlay muted playsInline />
          )}
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

          {photo && (
            <Form
              form={form}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onSubmit}
              autoComplete="on"
            >
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
          )}
        </>
      ) : (
        <CustomLink to={"/login"}>Debes iniciar sesión</CustomLink>
      )}
    </ContainerVideo>
  );
};

export default Capture;
