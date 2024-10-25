import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdmU1wDa_95WOGXrcUnUE3kduh1DT8lr8",
  authDomain: "course-work-9007.firebaseapp.com",
  projectId: "course-work-9007",
  storageBucket: "course-work-9007.appspot.com",
  messagingSenderId: "228384732281",
  appId: "1:228384732281:web:1193b3803bdcc402f490a8",
  measurementId: "G-H2MQG1R507"
};

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const storage = getStorage(app);