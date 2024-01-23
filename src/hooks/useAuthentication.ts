import { useState, useEffect, SetStateAction } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../firebase/store";

function useAuthentication() {
  const [userAuthenticated, setUserAutenticated] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<SetStateAction<null | any>>(null);
  const auth = useAuth((state) => state.auth);

  useEffect(() => {
    const unSuscribe = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserAutenticated(user);
          // https://firebase.google.com/docs/reference/js/firebase.User

          // ...
        } else {
          // User is signed out
          setUserAutenticated(null);
          // ...
        }
      });
    };
    return unSuscribe();
  }, [auth]);

  return userAuthenticated;
}

export default useAuthentication;
