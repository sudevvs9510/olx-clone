
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDNs7Epv3_wT-IGksAWdJV7vBrsg2QOdNQ",
    authDomain: "olx-clone-ed58c.firebaseapp.com",
    projectId: "olx-clone-ed58c",
    storageBucket: "olx-clone-ed58c.appspot.com",
    messagingSenderId: "969157604188",
    appId: "1:969157604188:web:651fb2098651f0cfe98799",
    measurementId: "G-VZCK1CJ606"
  };

const init = initializeApp(firebaseConfig);
export const auth = getAuth(init)
export const firebase = getFirestore(init)
 