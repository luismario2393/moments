import { useState, useEffect, SetStateAction } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function useAuthentication() {
  const [userAuthenticated, setUserAutenticated] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<SetStateAction<null | any>>(null);

  useEffect(() => {
    const unSuscribe = () => {
      const auth = getAuth();
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
  }, []);

  return userAuthenticated;
}

export default useAuthentication;
