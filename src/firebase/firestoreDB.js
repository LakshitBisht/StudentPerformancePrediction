import { db } from "./firebase";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

class UsersDB {
  constructor() {
    this.db = db;
    this.collectionName = "Users";
  }

  create = (docId) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return setDoc(docRef, { predictions: [] });
  };

  insertPredictions = (docId, data) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef, {
      predictions: arrayUnion(data),
    });
  };

  removePredictions = (docId, data) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef, {
      predictions: arrayRemove(data),
    });
  };

  clearPredictions = (docId) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef, {
      predictions: [],
    });
  };

  initialize = (docId) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return getDoc(docRef);
  };

  copy = (docId, predictionsArray) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return setDoc(docRef, { predictions: predictionsArray });
  };

  delete = (docId) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return deleteDoc(docRef);
  };
}

export default new UsersDB();
