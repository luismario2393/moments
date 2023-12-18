import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "./config";
import { getStorage } from "firebase/storage";

import "firebase/auth";
import "firebase/storage";
import { getFirestore, Firestore } from "firebase/firestore";

class Firebase {
  public firestore: Firestore;
  constructor() {
    const app = initializeApp(firebaseConfig);
    getAnalytics();
    getStorage();
    this.firestore = getFirestore(app);
  }
}

const firebase = new Firebase();

export default firebase;
