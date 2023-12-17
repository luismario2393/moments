import { BrowserRouter, Routes, Route } from "react-router-dom";
import firebase, { FirebaseContext } from "./firebase";
import useAuthentication from "./hooks/useAuthentication";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
// import { ChangeEvent, useState } from "react";
import { Register } from "./modules";

function App() {
  // const [urlPhoto, setUrlPhoto] = useState<string>();
  const user = useAuthentication();

  // const auth = getAuth();
  // const storage = getStorage();

  // const handleRegister = async (email: string, password: string) => {
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       updateProfile(user, {
  //         displayName: "Luis Mario",
  //         photoURL: urlPhoto,
  //       }).then(() => {
  //         console.log("se actualizo el perfil");
  //       });
  //       console.log({ user });
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log({ errorCode, errorMessage });
  //     });
  // };

  // const fileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];

  //   if (file) {
  //     const storageRef = ref(storage, `users/${file.name}`);

  //     await uploadBytes(storageRef, file);
  //     const getFiles = await getDownloadURL(storageRef);

  //     setUrlPhoto(getFiles);
  //   }
  // };

  return (
    <FirebaseContext.Provider value={{ firebase, user }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<p>Luis Mario</p>} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </FirebaseContext.Provider>
  );
}

export default App;
