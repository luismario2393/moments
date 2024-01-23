import { message } from "antd";
import { Firestore, collection, getDocs } from "firebase/firestore";

export const getMoments = async (db: Firestore) => {
  try {
    const querySnapshot = await getDocs(collection(db, "moments"));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const docs: any[] = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
  } catch (error) {
    message.error("Error al obtener los momentos");
  }
};
