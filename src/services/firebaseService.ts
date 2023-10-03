import firebase_app from "@/config/firebaseConfig";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export const getData = async () => {
  let docRef = collection(db, "Skills");
  let result = null;
  let err = null;
  const q = query(docRef, orderBy("value", "asc"));
  try {
    result = await getDocs(q);
  } catch (e) {
    err = e;
  }
  return { result, err };
};
