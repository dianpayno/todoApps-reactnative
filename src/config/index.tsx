import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCRRrGRO1T4I-AQTEBrsHfrZu-MSXxFPaU",
    authDomain: "waystodoapps.firebaseapp.com",
    projectId: "waystodoapps",
    storageBucket: "waystodoapps.appspot.com",
    messagingSenderId: "434854587435",
    appId: "1:434854587435:web:9694782b6440c32930ce6e"
  };
  
const app = initializeApp(firebaseConfig);

// initalizse database and export it
export const db=getFirestore(app);
export const auth = getAuth(app);