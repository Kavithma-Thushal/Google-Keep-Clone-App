import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtzrGw2C0S22ljzAHCVUn1hUGrv5l5GGw",
  authDomain: "course-work-c928c.firebaseapp.com",
  projectId: "course-work-c928c",
  storageBucket: "course-work-c928c.appspot.com",
  messagingSenderId: "305440778804",
  appId: "1:305440778804:web:21db0d3499cdcc89b67861",
  measurementId: "G-61E6MHD53P"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);