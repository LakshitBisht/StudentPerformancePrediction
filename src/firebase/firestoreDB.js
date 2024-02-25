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
    return setDoc(docRef,{mylist:[],history:[]});
  };

  insertHistory = (docId, data) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef,{
      history: arrayUnion(data)
    });
  }

  removeHistory = (docId, data) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef,{
      history: arrayRemove(data)
    });
  }

  clearHistory = (docId) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef,{
      history: []
    });
  }

  insertMyList = (docId, data) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef,{
      mylist: arrayUnion(data)
    });
  }

  removeMyList = (docId, data) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef,{
      mylist: arrayRemove(data)
    });
  }

  initialize = (docId) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return getDoc(docRef);
  };

  copy = (docId, listArray, historyArray) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return setDoc(docRef,{mylist: listArray,history: historyArray});
  };

  delete = (docId) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return deleteDoc(docRef);
  };
}

export default new UsersDB();
