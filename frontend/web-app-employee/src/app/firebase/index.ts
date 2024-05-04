import { getMessaging } from "firebase/messaging";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyAYk04pAROpajVpve3-7Snx4VhxjXshnFU",
    authDomain: "test-27676.firebaseapp.com",
    projectId: "test-27676",
    storageBucket: "test-27676.appspot.com",
    messagingSenderId: "512336316252",
    appId: "1:512336316252:web:44dbd234256c8ea21a6399",
    measurementId: "G-KFPC51MKQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);