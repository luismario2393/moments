import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "./config";
import { getStorage } from "firebase/storage";
import "firebase/auth";
import "firebase/storage";

class Firebase {
  constructor() {
    initializeApp(firebaseConfig);
    getAnalytics();
    getStorage();
  }
}

const firebase = new Firebase();

export default firebase;
