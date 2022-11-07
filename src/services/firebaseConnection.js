import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBqv7g7n-9x40AIV7smSdzwUk2owzcbs14",
    authDomain: "sistema-9e0e8.firebaseapp.com",
    projectId: "sistema-9e0e8",
    storageBucket: "sistema-9e0e8.appspot.com",
    messagingSenderId: "954522527316",
    appId: "1:954522527316:web:85c5f8b1308005cfef6fc1",
    measurementId: "G-7092YZMP2Z"
};

// Initialize Firebase
if (!firebase.apps.lenght) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;