import { getAuth } from "firebase/auth";
import { Button, LayoutHome, Typography } from "../../components";
import firebase from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Avatar, message } from "antd";
import {
  CardMoments,
  ContainerImage,
  ContainerText,
  ContainerUser,
  ContainerButtons,
} from "./style";
import { ButtonType, TypographyType } from "../../state/emun";
import { LikeOutlined, ShareAltOutlined } from "@ant-design/icons";

const Home = () => {
  const auth = getAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [moments, setMoments] = useState<any>([]);
  const user = auth.currentUser;
  const db = firebase.firestore;

  const getMoments = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "moments"));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const docs: any[] = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        docs.push({ ...doc.data(), id: doc.id });
      });
      setMoments(docs);
    } catch (error) {
      console.log(error);
    }
  }, [db, setMoments]);
  console.log({ moments });

  useEffect(() => {
    getMoments();
  }, [getMoments]);

  const handleLike = async (momentId: string, userId: string) => {
    const momentRef = doc(db, "moments", momentId);
    const momentSnapshot = await getDoc(momentRef);
    if (momentSnapshot.exists()) {
      const likes = momentSnapshot.data()?.likes || [];
      if (!likes.includes(userId)) {
        await updateDoc(momentRef, {
          likes: [...likes, userId],
        });
        await getMoments();
        message.success("Te gusto el momento.");
      } else {
        message.warning("Ya te gusto el momento.");
      }
    } else {
      message.error("El momento no existe.");
    }
  };

  const handleShareMoment = async (momentId: string, userId: string) => {
    const momentRef = doc(db, "moments", momentId);

    const momentSnapshot = await getDoc(momentRef);

    if (momentSnapshot.exists()) {
      const shared = momentSnapshot.data()?.shared || [];
      if (!shared.includes(userId)) {
        await updateDoc(momentRef, {
          shared: [...shared, userId],
        });
        await getMoments();
        message.success("Momento compartido con éxito.");
      } else {
        message.warning("Ya compartiste el momento.");
      }
    } else {
      message.error("El momento no existe.");
    }
  };

  return (
    <LayoutHome>
      {moments.length > 0 &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        moments.map((moment: any) => {
          const isLiked = moment.likes.includes(user?.uid ?? "");
          const isShared = moment.shared.includes(user?.uid ?? "");

          return (
            <>
              <CardMoments>
                <ContainerImage src={moment.photo}></ContainerImage>
                <ContainerText>
                  <ContainerUser>
                    <Avatar
                      src={moment.photoUser}
                      alt={`image`}
                      style={{ border: "1px solid #1358B4" }}
                    />
                    <div>
                      <Typography
                        type={TypographyType.BodyMedium}
                        text={moment.userName}
                      />
                      <Typography
                        type={TypographyType.Caption}
                        text={moment.description}
                      />
                    </div>
                  </ContainerUser>
                  <ContainerButtons
                    isLiked={`${isLiked}`}
                    isShared={`${isShared}`}
                  >
                    <Button
                      className="button-like"
                      customType={ButtonType.secondary}
                      onClick={() => handleLike(moment.id, user?.uid ?? "")}
                    >
                      <LikeOutlined />
                    </Button>
                    <Typography
                      type={TypographyType.BodyMedium}
                      text={`${moment.likes.length}`}
                    />
                    <Button
                      className="button-share"
                      customType={ButtonType.secondary}
                      onClick={() =>
                        handleShareMoment(moment.id, user?.uid ?? "")
                      }
                    >
                      <ShareAltOutlined />
                    </Button>
                    <Typography
                      type={TypographyType.BodyMedium}
                      text={`${moment.shared.length}`}
                    />
                  </ContainerButtons>
                </ContainerText>
              </CardMoments>
            </>
          );
        })}
    </LayoutHome>
  );
};

export default Home;
