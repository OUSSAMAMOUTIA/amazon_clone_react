import {initializeApp}from  'firebase/app';
import { getAuth} from 'firebase/auth';
import { getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCU_74yE5GCCUF9WgC084zHEZr7p4RP5Zo",
  authDomain: "react-208e4.firebaseapp.com",
  projectId: "react-208e4",
  storageBucket: "react-208e4.appspot.com",
  messagingSenderId: "400706345783",
  appId: "1:400706345783:web:54413292b8288ff90f98b2",
};
const firebaseAPP = initializeApp(firebaseConfig);

const auth = getAuth(firebaseAPP)
const db = getDatabase(firebaseAPP)

export  { db, auth };
