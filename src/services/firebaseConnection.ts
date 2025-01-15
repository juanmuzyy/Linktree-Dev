// AULA 44, COMO CONFIG O FIREBASE
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCOT_el1OLDeLrFxze9K13J0RzU2wbKscU",
  authDomain: "linktreedev-fcd10.firebaseapp.com",
  projectId: "linktreedev-fcd10",
  storageBucket: "linktreedev-fcd10.firebasestorage.app",
  messagingSenderId: "570517109753",
  appId: "1:570517109753:web:127541bc057c0b11ed1b28"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}


//LOGIN

// juanmuzydev@gmail.com
// muzy1002